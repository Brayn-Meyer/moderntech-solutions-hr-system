<template>
  <navbar-comp />
  <div class="performance-review-container">
    <h1>Employee Performance Reviews</h1>

    <div class="controls">
      <div class="search-filter">
        <input type="text" v-model="searchQuery" placeholder="Search employees..." class="search-input">
        <select v-model="selectedDepartment" class="department-select">
          <option value="">All Departments</option>
          <option v-for="dept in departments" :value="dept" :key="dept">{{ dept }}</option>
        </select>
      </div>

      <button @click="openReviewModal(null)" class="add-review-btn">
        + Add New Review
      </button>
    </div>

    <div class="reviews-table">
      <table>
        <thead>
          <tr>
            <th @click="sortReviews('employeeName')">Employee</th>
            <th @click="sortReviews('department')">Department</th>
            <th @click="sortReviews('reviewDate')">Review Date</th>
            <th @click="sortReviews('rating')">Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in filteredReviews" :key="review.id">
            <td>{{ review.employeeName }}</td>
            <td>{{ review.department }}</td>
            <td>{{ formatDate(review.reviewDate) }}</td>
            <td>
              <div class="rating-display">
                <span v-for="n in 5" :key="n" :class="['star', { 'filled': n <= review.rating }]">
                  ★
                </span>
              </div>
            </td>
            <td>
              <span :class="['status-badge', review.status]">
                {{ review.status }}
              </span>
            </td>
            <td>
              <button @click="openReviewModal(review)" class="action-btn edit-btn">
                Edit
              </button>
              <button @click="confirmDelete(review.id)" class="action-btn delete-btn">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Review Modal -->
    <div v-if="showReviewModal" class="modal-overlay">
      <div class="review-modal">
        <div class="modal-header">
          <h2>{{ editingReview ? 'Edit Performance Review' : 'Add New Performance Review' }}</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitReview">
            <div class="form-group">
              <label>Employee</label>
              <select v-model="form.employeeId" required class="form-input">
                <option value="">Select Employee</option>
                <option v-for="employee in employees" :value="employee.id" :key="employee.id">
                  {{ employee.name }} ({{ employee.department }})
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Review Date</label>
              <input type="date" v-model="form.reviewDate" required class="form-input">
            </div>

            <div class="form-group">
              <label>Rating (1-5)</label>
              <div class="rating-input">
                <span v-for="n in 5" :key="n" @click="form.rating = n"
                  :class="['star', { 'filled': n <= form.rating }]">
                  ★
                </span>
              </div>
            </div>

            <div class="form-group">
              <label>Strengths</label>
              <textarea v-model="form.strengths" placeholder="Employee strengths..." class="form-textarea"></textarea>
            </div>

            <div class="form-group">
              <label>Areas for Improvement</label>
              <textarea v-model="form.areasForImprovement" placeholder="Areas needing improvement..."
                class="form-textarea"></textarea>
            </div>

            <div class="form-group">
              <label>Goals</label>
              <textarea v-model="form.goals" placeholder="Future goals..." class="form-textarea"></textarea>
            </div>

            <div class="form-group">
              <label>Status</label>
              <select v-model="form.status" class="form-input">
                <option value="Draft">Draft</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div class="form-actions">
              <button type="button" @click="closeModal" class="cancel-btn">
                Cancel
              </button>
              <button type="submit" class="submit-btn">
                {{ editingReview ? 'Update' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="confirmation-modal">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this performance review?</p>
        <div class="modal-actions">
          <button @click="showDeleteModal = false" class="cancel-btn">
            Cancel
          </button>
          <button @click="deleteReview" class="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <footer-comp />
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import { useStore } from 'vuex';

export default {
  components: {
    NavbarComp,
    FooterComp
  },
  setup() {
    const store = useStore();

    // Build employees array from Vuex store
    const employees = computed(() =>
      store.state.employee_info.map(emp => ({
        id: emp.employeeId,
        name: emp.name,
        department: emp.department
      }))
    );

    // Helper functions
    const getRandomDate = () => {
      const start = new Date(2025, 7, 1).getTime();
      const end = new Date().getTime();
      const date = new Date(start + Math.random() * (end - start));
      return date.toISOString().split('T')[0];
    };

    const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

    const getStrengths = (rating) => {
      if (rating >= 4) return "Consistently exceeds expectations and demonstrates strong leadership.";
      if (rating === 3) return "Meets expectations and works well with the team.";
      return "Needs improvement in key performance areas.";
    };

    const getAreasForImprovement = (rating) => {
      if (rating >= 4) return "Continue current performance and mentor others.";
      if (rating === 3) return "Could take more initiative and seek feedback.";
      return "Should focus on time management and skill development.";
    };

    const getGoals = (rating) => {
      if (rating >= 4) return "Take on more challenging projects and lead initiatives.";
      if (rating === 3) return "Improve consistency and expand technical skills.";
      return "Attend training sessions and set short-term improvement goals.";
    };

    const getRandomStatus = () => {
      const statuses = ['Draft', 'Completed', 'Archived'];
      return statuses[Math.floor(Math.random() * statuses.length)];
    };

    // Declare reviews BEFORE using it in onMounted/watch
    const reviews = ref(
      store.state.employee_info.map(emp => {
        const rating = getRandomRating();
        return {
          id: emp.employeeId,
          employeeId: emp.employeeId,
          employeeName: emp.name,
          department: emp.department,
          reviewDate: getRandomDate(),
          rating,
          strengths: getStrengths(rating),
          areasForImprovement: getAreasForImprovement(rating),
          goals: getGoals(rating),
          status: getRandomStatus()
        };
      })
    );

    
    onMounted(() => {
      store.commit('set_performance_reviews', reviews.value);
    });
    watch(reviews, (newVal) => {
      store.commit('set_performance_reviews', newVal);
    }, { deep: true });

    // Form and UI state
    const searchQuery = ref('');
    const selectedDepartment = ref('');
    const sortField = ref('reviewDate');
    const sortDirection = ref('desc');
    const showReviewModal = ref(false);
    const showDeleteModal = ref(false);
    const editingReview = ref(null);
    const reviewToDelete = ref(null);

    const form = ref({
      employeeId: '',
      reviewDate: new Date().toISOString().split('T')[0],
      rating: 3,
      strengths: '',
      areasForImprovement: '',
      goals: '',
      status: 'Draft'
    });

    // Computed properties
    const departments = computed(() => {
      const depts = new Set();
      employees.value.forEach(emp => depts.add(emp.department));
      return Array.from(depts);
    });

    const filteredReviews = computed(() => {
      let filtered = [...reviews.value];

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(review =>
          review.employeeName.toLowerCase().includes(query)
        );
      }

      // Filter by department
      if (selectedDepartment.value) {
        filtered = filtered.filter(review =>
          review.department === selectedDepartment.value
        );
      }

      // Sorting
      filtered.sort((a, b) => {
        let modifier = sortDirection.value === 'asc' ? 1 : -1;
        if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
        if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
        return 0;
      });

      return filtered;
    });

    // Methods
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const sortReviews = (field) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortField.value = field;
        sortDirection.value = 'asc';
      }
    };

    const openReviewModal = (review) => {
      editingReview.value = review;
      if (review) {
        // Editing existing review
        form.value = {
          employeeId: review.employeeId,
          reviewDate: review.reviewDate,
          rating: review.rating,
          strengths: review.strengths,
          areasForImprovement: review.areasForImprovement,
          goals: review.goals,
          status: review.status
        };
      } else {
        // Adding new review
        form.value = {
          employeeId: '',
          reviewDate: new Date().toISOString().split('T')[0],
          rating: 3,
          strengths: '',
          areasForImprovement: '',
          goals: '',
          status: 'Draft'
        };
      }
      showReviewModal.value = true;
    };

    const closeModal = () => {
      showReviewModal.value = false;
      editingReview.value = null;
    };

    const submitReview = () => {
      const employee = employees.value.find(emp => emp.id === parseInt(form.value.employeeId));

      if (editingReview.value) {
        // Update existing review
        const index = reviews.value.findIndex(r => r.id === editingReview.value.id);
        reviews.value[index] = {
          ...reviews.value[index],
          ...form.value,
          employeeName: employee.name,
          department: employee.department
        };
      } else {
        // Add new review
        const newReview = {
          id: Math.max(...reviews.value.map(r => r.id)) + 1,
          ...form.value,
          employeeName: employee.name,
          department: employee.department
        };
        reviews.value.push(newReview);
      }

      closeModal();
    };

    const confirmDelete = (id) => {
      reviewToDelete.value = id;
      showDeleteModal.value = true;
    };

    const deleteReview = () => {
      reviews.value = reviews.value.filter(review => review.id !== reviewToDelete.value);
      showDeleteModal.value = false;
      reviewToDelete.value = null;
    };

    return {
      employees,
      reviews,
      searchQuery,
      selectedDepartment,
      departments,
      filteredReviews,
      showReviewModal,
      showDeleteModal,
      editingReview,
      form,
      formatDate,
      sortReviews,
      openReviewModal,
      closeModal,
      submitReview,
      confirmDelete,
      deleteReview
    };
  }
};
</script>

<style scoped>
.performance-review-container {
  max-width: 1200px;
  margin: 30px auto; /* Center horizontally */
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5efeb;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
}

h1 {
  color: #0b2545;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
  width: 100%;
}

.controls {
  display: flex;
  justify-content: center; /* Center controls */
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  gap: 20px;
}

.search-filter {
  display: flex;
  gap: 15px;
}

.search-input, .department-select {
  padding: 8px 12px;
  border: 1px solid #c8d9e6;
  border-radius: 4px;
  font-size: 14px;
  background-color: #ffffff;
  color: #2f4156;
}

.search-input::placeholder {
  color: #a8b9c6;
}

.add-review-btn {
  background: linear-gradient(135deg, #0b2545, #8da9c4);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(47, 65, 86, 0.1);
}

.add-review-btn:hover {
  background: linear-gradient(135deg, #e9dee2, #a9989a);
  box-shadow: 0 4px 8px rgba(47, 65, 86, 0.2);
}

.reviews-table {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(47, 65, 86, 0.1);
  overflow: hidden;
  border: 1px solid #e0e8ee;
  margin: 0 auto; /* Center table */
  width: 100%;
  display: flex;
  justify-content: center;
}

.reviews-table table {
  min-width: 600px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e8ee;
}

th {
  background-color: #0b2545;
  color: white;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

th:hover {
background-color: #567c8d;
}

tr:hover {
  background-color: #f8fafc;
}

.rating-display, .rating-input {
  display: flex;
  gap: 2px;
}

.star {
  color: #d6e4f0;
  font-size: 18px;
  cursor: pointer;
}

.star.filled {
  color: #ffc107;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}

.status-badge.Draft {
  background: linear-gradient(135deg, #fff3bf, #ffe69e);
  color: #e67700;
}

.status-badge.Completed {
  background: linear-gradient(135deg, #d3f9d8, #b2f2bb);
  color: #2b8a3e;
}

.status-badge.Archived {
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  color: #495057;
}

.action-btn {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 8px;
  transition: all 0.2s;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.edit-btn {
 background-color: #0b2545;
  color: white;
}

.edit-btn:hover {
  background: #8da9c4;
}

.delete-btn {
  background-color: #b82323;
  color: white;
}

.delete-btn:hover {
  background: linear-gradient(135deg, #fa5252, #ff6b6b);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(47, 65, 86, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.review-modal, .confirmation-modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 25px rgba(47, 65, 86, 0.2);
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #d6e4f0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e8ee;
  background: linear-gradient(to right, #0b2545, #8da9c4);
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal-header h2 {
  margin: 0;
  color: #ffffff;
  font-size: 1.4rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #567c8d;
  transition: color 0.2s;
  line-height: 1;
  padding: 0 8px;
}

.close-btn:hover {
  color: #2f4156;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2f4156;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d6e4f0;
  border-radius: 4px;
  font-size: 14px;
  color: #2f4156;
  background-color: #ffffff;
  transition: border-color 0.2s;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #567c8d;
  box-shadow: 0 0 0 2px rgba(86, 124, 141, 0.1);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions, .modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e8ee;
}

.cancel-btn {
 background-color: #0b2545;
  color: #ffffff;
  border: 1px solid #d6e4f0;
  padding: 10px 18px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background-color: #e6eef5;
  border-color: #c8d9e6;
}

.submit-btn {
 background-color: #0b2545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(47, 65, 86, 0.1);
}

.submit-btn:hover {
  background: linear-gradient(135deg, #e3dde0, #ccc1c3);
  box-shadow: 0 4px 8px rgba(47, 65, 86, 0.2);
}

.confirmation-modal {
  padding: 25px;
  text-align: center;
}

.confirmation-modal h3 {
  margin-top: 0;
  color: #2f4156;
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.confirmation-modal p {
  color: #567c8d;
  margin-bottom: 25px;
  font-size: 15px;
}

.modal-actions {
  justify-content: center;
  border-top: none;
  padding-top: 0;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .search-filter {
    flex-direction: column;
    gap: 10px;
  }
  
  .search-input, .department-select, .add-review-btn {
    width: 100%;
  }
  
  th, td {
    padding: 10px;
    font-size: 14px;
  }
  
  .action-btn {
    display: block;
    width: 100%;
    margin-bottom: 8px;
  }
  
  .review-modal {
    width: 95%;
    max-height: 85vh;
  }
  
  .modal-header h2 {
    font-size: 1.2rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .cancel-btn, .submit-btn, .delete-btn {
    width: 100%;
  }
}

@media (max-width: 425px) {
  .reviews-table {
    overflow-x: auto;
    width: 100%;
  }
  .reviews-table table {
    min-width: 600px;
  }
}
</style>