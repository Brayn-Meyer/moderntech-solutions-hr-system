<template>
  <div class="edit-modal-overlay" @click.self="$emit('close')">
    <div class="edit-modal">
      <div class="edit-modal-header">
        <h2>Edit {{ form.name }}</h2>
      </div>

      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label>Name</label>
          <input v-model="form.name" required />
        </div>

        <div class="form-group">
          <label>Position</label>
          <input v-model="form.position" required />
        </div>

        <div class="form-group">
          <label>Department</label>
          <input v-model="form.department" required />
        </div>

        <div class="form-group">
          <label>Salary</label>
          <input v-model="form.salary" type="number" required />
        </div>

        <div class="modal-actions">
          <button type="submit" class="save-btn">Save</button>
          <button type="button" class="cancel-btn" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.edit-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(47, 65, 86, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(4px);
}

.edit-modal {
  background: linear-gradient(to bottom right, #ffffff, #f5efeb);
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 12px 36px rgba(47, 65, 86, 0.25);
}

.edit-modal-header {
  margin-bottom: 1rem;
  border-bottom: 1px solid #c8d9e6;
}

.edit-modal-header h2 {
  margin: 0;
  color: #0b2545;
}

.edit-form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #0b2545;
}

input {
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #c8d9e6;
  font-size: 0.95rem;
}

.edit-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.edit-save-btn {
  background-color: #0b2545;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.edit-cancel-btn {
  background-color: #d32d2d;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
</style>