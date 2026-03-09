document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('categoryFilter');

    // Filter function
    function filterPosts() {
        const searchText = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        posts.forEach(post => {
            const title = post.querySelector('h3').innerText.toLowerCase();
            const description = post.querySelector('.description').innerText.toLowerCase();
            const postCategory = post.dataset.category;

            if (
                (title.includes(searchText) || description.includes(searchText)) &&
                (category === 'all' || postCategory === category)
            ) {
                post.style.display = '';
            } else {
                post.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterPosts);
    categoryFilter.addEventListener('change', filterPosts);

    // Manual-only carousel
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const slides = carousel.querySelector('.slides');
        const slideImgs = slides.querySelectorAll('img');
        const prev = carousel.querySelector('.prev');
        const next = carousel.querySelector('.next');
        let index = 0;

        function showSlide(i) {
            index = (i + slideImgs.length) % slideImgs.length;
            slides.style.transform = `translateX(-${index * 100}%)`;
        }

        // Click buttons to manually change slides
        next.addEventListener('click', () => {
            showSlide(index + 1);
        });

        prev.addEventListener('click', () => {
            showSlide(index - 1);
        });

        // Optional: advance one slide on hover over carousel
        carousel.addEventListener('mouseenter', () => {
            showSlide(index + 1);
        });

        // Swipe support for mobile
        let startX = 0;
        slides.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        slides.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].clientX - startX;
            if (diff > 50) showSlide(index - 1);
            else if (diff < -50) showSlide(index + 1);
        });

        // Optional: adjust carousel height dynamically
        let maxHeight = 0;
        slideImgs.forEach(img => {
            img.addEventListener('load', () => {
                if (img.height > maxHeight) maxHeight = img.height;
                slides.style.height = maxHeight + 'px';
            });
            if (img.complete) {
                if (img.height > maxHeight) maxHeight = img.height;
                slides.style.height = maxHeight + 'px';
            }
        });
    });
});