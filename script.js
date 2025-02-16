// script.js
document.addEventListener('DOMContentLoaded', () => {
    const bookmarkForm = document.getElementById('bookmark-form');
    const bookmarksContainer = document.getElementById('bookmarks-container');

    // Load bookmarks from local storage
    const loadBookmarks = () => {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        if (!bookmarks || bookmarks.length === 0) {
            bookmarks = getDefaultBookmarks();
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
        bookmarksContainer.innerHTML = '';

        bookmarks.forEach((bookmark, index) => {
            const bookmarkElement = document.createElement('div');
            bookmarkElement.className = 'bookmark';
            bookmarkElement.innerHTML = `
                <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
                <button data-index="${index}">Delete</button>
            `;
            bookmarksContainer.appendChild(bookmarkElement);
        });
    };

    // Get default bookmarks
    const getDefaultBookmarks = () => [
        { title: 'CUIMS', url: 'https://students.cuchd.in/', category: 'education' },
        { title: 'CULMS', url: 'https://lms.cuchd.in/login/index.php', category: 'education' },
        { title: 'CUCHD', url: 'https://cuchd664.examly.io/login', category: 'education' },
        { title: 'CUILS', url: 'https://cuils.cuchd.in/', category: 'education' }
    ];

    // Save a new bookmark
    bookmarkForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const url = document.getElementById('url').value;
        const category = document.getElementById('category').value;

        const bookmark = { title, url, category };
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        bookmarkForm.reset();
        loadBookmarks();
    });

    // Delete a bookmark
    bookmarksContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            bookmarks.splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            loadBookmarks();
        }
    });

    // Initial load
    loadBookmarks();
});
