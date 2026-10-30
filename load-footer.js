// load-footer.js
document.addEventListener("DOMContentLoaded", function() {
  
  const footerHTML = `
    <footer>
      © Taiwan CS Theory Day in Hsinchu
    </footer>
  `;
  
  // 找到 </div> 結束前或 body 結束前插入
  document.querySelector('.page-container').insertAdjacentHTML('beforeend', footerHTML);
});