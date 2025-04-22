// 等待DOM内容加载完成
document.addEventListener("DOMContentLoaded", () => {
  // 初始化GSAP和ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // 技能进度条动画
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    ScrollTrigger.create({
      trigger: bar,
      start: "top 80%",
      onEnter: () => {
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          ease: "power2.out",
        });
      },
      once: false,
    });
  });

  // 淡入动画元素
  const fadeElements = document.querySelectorAll(
    ".section-title, .profile, .skill-card, .timeline-item, .contact-card"
  );
  fadeElements.forEach((element) => {
    element.classList.add("fade-in");

    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      onEnter: () => {
        element.classList.add("active");
      },
      once: true,
    });
  });

  // Hero区域的视差效果
  const hero = document.querySelector(".hero");
  gsap.to(hero, {
    backgroundPosition: "50% 50%",
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // 鼠标移动效果
  const heroContent = document.querySelector(".hero-content");
  window.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    gsap.to(heroContent, {
      x: x * 20,
      y: y * 20,
      duration: 0.5,
      ease: "power1.out",
    });
  });

  // 特殊文字效果
  const glitchText = document.querySelector(".glitch");
  if (glitchText) {
    const text = glitchText.innerText;
    const dataText = glitchText.getAttribute("data-text");

    setInterval(() => {
      const randomNum = Math.random();
      if (randomNum < 0.05) {
        glitchText.innerText = generateRandomChars(text.length);
        setTimeout(() => {
          glitchText.innerText = text;
        }, 100);
      }
    }, 2000);
  }

  // 平滑滚动到页面不同部分
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // 向下滚动指示器点击事件
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        window.scrollTo({
          top: aboutSection.offsetTop,
          behavior: "smooth",
        });
      }
    });
  }
});

// 生成随机字符
function generateRandomChars(length) {
  const chars =
    "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 添加类型化文本动画
class TypeWriter {
  constructor(textElement, words, wait = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // 当前单词索引
    const current = this.wordIndex % this.words.length;
    // 获取完整文本
    const fullTxt = this.words[current];

    // 检查是否处于删除状态
    if (this.isDeleting) {
      // 移除字符
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // 添加字符
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // 设置文本
    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // 初始打字速度
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // 如果完成了一个单词
    if (!this.isDeleting && this.txt === fullTxt) {
      // 在单词末尾停顿
      typeSpeed = this.wait;
      // 设置删除状态
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // 移动到下一个单词
      this.wordIndex++;
      // 打字前暂停
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// 初始化类型化效果
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".subtitle");
  if (txtElement) {
    const words = [
      "欢迎来到我的世界",
      "我是一名开发者",
      "我是一名设计师",
      "我是一名创新者",
    ];
    new TypeWriter(txtElement, words, 3000);
  }
}
