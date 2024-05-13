// função para exibir o carrinho de compras
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = new bootstrap.Modal(document.getElementById('cart-modal'));

    cartIcon.addEventListener('click', function() {
        cartModal.show();
    });
});