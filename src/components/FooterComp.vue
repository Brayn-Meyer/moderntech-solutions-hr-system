<template>
    <footer class="footer">
        <div class="footer-content">
            <b>ModernTech Solutions © 2025</b>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'AppFooter'
}
</script>

<style scoped>
.footer {
    background:whitesmoke;
    color: white;
    padding: 20px 0;
    text-align: center;
    position: sticky;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

b{
    color: #0b2545
    ;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}


@media (max-width: 768px) {
    .footer {
        padding: 15px 0;
        font-size: 14px;
    }
}
</style>