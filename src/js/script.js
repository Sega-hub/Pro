document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 501) {
        const cards = document.querySelectorAll(".card"); 
        const effect = document.querySelector(".effect");
    
        const lines = document.querySelectorAll(".line"); 
    
        if (lines.length > 0) {
            window.addEventListener("scroll", animOnScroll);
            function animOnScroll() {
                for (let i = 0; i < lines.length; i++) {
                    const animLine = lines[i];
                    const animLineHeight = animLine.offsetHeight;
                    const animLineOffset = offset(animLine).top;
                    const animStart = 0.5;
        
                    let lineAnimPoint = window.innerHeight - animLineHeight / animStart;
        
                    if (animLineHeight > window.innerHeight) {
                        lineAnimPoint = window.innerHeight - window.innerHeight / animStart;
                    }
        
                    if ((pageYOffset > animLineOffset - lineAnimPoint) && pageYOffset < (animLineOffset + animLineHeight)) {               
                        animLine.classList.add("play");
                    }
                };
            }
        } 
    
        cards.forEach(card => {
               
            card.style.position = "relative";
            card.style.overflow = "hidden"; 
            card.style.transition = "0.5s";
            
            effect.style.position = "absolute"; 
            effect.style.scale = "0";
    
            card.addEventListener("mousemove", (e) => {
                if (!card.contains(effect)) {
                    card.appendChild(effect);
                }
                const rect = card.getBoundingClientRect(); 
                const effectWidth = effect.offsetWidth / 2;
                const effectHeight = effect.offsetHeight / 2;
               
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;               
                const left = offsetX - effectWidth;
                const top = offsetY - effectHeight;
    
                effect.style.scale = "1"; 
                effect.style.top = top + "px";
                effect.style.left = left + "px";
    
                const cardWidth = card.offsetWidth;
                const cardHeight = card.offsetHeight;
                const mouseInX = e.clientX - card.getBoundingClientRect().left;
                const mouseInY = e.clientY - card.getBoundingClientRect().top;
    
                if (mouseInX < (cardWidth / 4) && mouseInY < (cardHeight / 4)) {
                    card.style.transform = "perspective(700px) rotateX(-0.84deg) rotateY(1.39deg)";
                } else if (mouseInX > (cardWidth*(3/4)) && mouseInY < (cardHeight / 4)) {
                    card.style.transform = "perspective(700px) rotateX(-0.88deg) rotateY(-1.44deg)";
                } else if (mouseInX < (cardWidth / 4) && mouseInY > (cardHeight*(3/4))) {
                    card.style.transform = "perspective(700px) rotateX(0.84deg) rotateY(-1.39deg)";
                } else if (mouseInX > (cardWidth*(3/4)) &&  mouseInY > (cardHeight*(3/4))) {
                    card.style.transform = "perspective(700px) rotateX(0.88deg) rotateY(1.44deg)";
                } else  card.style.transform = "";
                 
            });
            card.addEventListener("mouseleave", () => {
                effect.style.scale = "0";
                card.style.transform = "";
                if (card.contains(effect)) {
                    card.removeChild(effect);
                }
            });
        }); 

        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        const SCROLL_THRESHOLD = 50;
        
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > SCROLL_THRESHOLD) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        
         
            if (scrollTop > lastScrollTop) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        
            lastScrollTop = Math.max(0, scrollTop);
        };
        
        window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
    
        const texts = document.querySelectorAll("#text");
    
        if (texts.length > 0) {
            window.addEventListener("scroll", textAppearance);
            function textAppearance() {
                for (let i = 0; i < texts.length; i++) {
                    const textAnim = texts[i];
                    const textHeight = textAnim.offsetHeight;
                    const textAnimOffset = offset(textAnim).top;
                    const textStart = 1.8;
        
                    let textStartPoint = window.innerHeight - textHeight / textStart;
        
                    if (textHeight > window.innerHeight) {
                        textStartPoint = window.innerHeight - window.innerHeight / textStart;
                    }
        
                    if ((pageYOffset > textAnimOffset - textStartPoint) && pageYOffset < (textAnimOffset + textHeight)) {               
                        textAnim.classList.add("appearance");
                    }
                };
            }
        } 
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(), 
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    
    const videos = document.querySelectorAll("#playback"); // Выбираем все видео

    videos.forEach(video => {
        let reverse = false; // Флаг реверса

        video.addEventListener("timeupdate", () => {
            if (!reverse && video.currentTime >= video.duration - 0.1) {
                reverse = true;
                reversePlayback(video);
            } else if (reverse && video.currentTime <= 0.1) {
                reverse = false;
                video.play();
            }
        });

        video.play(); // Запускаем видео
    });

    function reversePlayback(video) {
        video.pause(); // Останавливаем видео перед реверсом
        const interval = setInterval(() => {
            if (video.currentTime > 0.1) {
                video.currentTime -= 0.05; // Перематываем назад вручную
            } else {
                clearInterval(interval);
                video.play(); // Запускаем заново
            }
        }, 30);
    }

});
    

