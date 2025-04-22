// main.js - Main JavaScript file for Tcarval website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle active state for sidebar links
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    
    sidebarLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Table of contents scroll spy functionality
    const tocItems = document.querySelectorAll('.toc-item');
    const sections = document.querySelectorAll('[data-section]');
    
    if (tocItems.length > 0 && sections.length > 0) {
        // Function to set active TOC item
        function setActiveTocItem() {
            let currentSectionId = null;
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop < 200) {
                    currentSectionId = section.getAttribute('data-section');
                }
            });
            
            tocItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === currentSectionId) {
                    item.classList.add('active');
                }
            });
        }
        
        // Add click event to TOC items
        tocItems.forEach(item => {
            item.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                const section = document.querySelector(`[data-section="${sectionId}"]`);
                
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Listen for scroll events
        window.addEventListener('scroll', setActiveTocItem);
        
        // Initialize active TOC item
        setActiveTocItem();
    }

    // Handle like, bookmark, and share buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.getAttribute('data-action');
            const postId = this.getAttribute('data-post-id');
            
            // In a real application, you would send an AJAX request to the server
            console.log(`Action: ${action}, Post ID: ${postId}`);
            
            // For demo purposes, just toggle the active class
            this.classList.toggle('active');
            
            // Update the count
            const countElement = this.querySelector('.count');
            if (countElement) {
                let count = parseInt(countElement.textContent);
                if (this.classList.contains('active')) {
                    count++;
                } else {
                    count--;
                }
                countElement.textContent = count;
            }
        });
    });

    // Handle comment form submission
    const commentForm = document.querySelector('#comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const commentText = document.querySelector('#comment-text').value;
            const postId = this.getAttribute('data-post-id');
            
            if (commentText.trim() === '') {
                return;
            }
            
            // In a real application, you would send an AJAX request to the server
            console.log(`New comment on post ${postId}: ${commentText}`);
            
            // For demo purposes, add the comment to the DOM
            const commentsContainer = document.querySelector('#comments-container');
            const currentDate = new Date().toLocaleDateString();
            
            const newComment = `
                <div class="d-flex gap-3 mb-4">
                    <div class="avatar">
                        <div class="avatar-fallback">我</div>
                    </div>
                    <div class="flex-grow-1">
                        <div class="bg-light p-3 rounded">
                            <div class="fw-medium">我</div>
                            <p>${commentText}</p>
                        </div>
                        <div class="d-flex align-items-center gap-3 mt-2 text-muted small">
                            <button class="btn btn-sm text-muted p-0">讚 (0)</button>
                            <button class="btn btn-sm text-muted p-0">回覆</button>
                            <span>剛剛</span>
                        </div>
                    </div>
                </div>
            `;
            
            commentsContainer.insertAdjacentHTML('afterbegin', newComment);
            
            // Clear the form
            document.querySelector('#comment-text').value = '';
        });
    }
});