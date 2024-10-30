$(document).ready(function() {
    var preEl = document.querySelectorAll('pre')
    var codeEl = document.querySelectorAll('pre code');
    var copyButton = `<button class="clipboard tooltip"><img class="clippy" src="/assets/img/clippy.svg" width="13" alt="Copy to clipboard"><span class="tooltiptext">Copied!</span></button>`
    
    codeEl.forEach(code => {
        code.insertAdjacentHTML('beforebegin', copyButton)
    })    

    preEl.forEach(pre => {
        let copyBTN = pre.querySelector('.clipboard')
        pre.addEventListener('mouseover', () => {
            copyBTN.classList.add('active')
        })
        pre.addEventListener('mouseleave', () => {
            copyBTN.classList.remove('active')
        })
    })

    var clipboard = new ClipboardJS('.clipboard', {
        target: function (trigger) {
            return trigger.nextElementSibling;
        }
    });

    clipboard.on('success', function (e) {
        e.clearSelection();
        let tooltip = e.trigger.querySelector('.tooltiptext');
        tooltip.classList.add('active');
        setTimeout(() => {
            tooltip.classList.remove('active');
        }, 1000);
    });
});