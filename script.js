// �ȴ�DOM���ݼ������
document.addEventListener("DOMContentLoaded", () => {
  // ��ʼ��GSAP��ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // ���ܽ���������
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

  // ���붯��Ԫ��
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

  // Hero������Ӳ�Ч��
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

  // ����ƶ�Ч��
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

  // ��������Ч��
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

  // ƽ��������ҳ�治ͬ����
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

  // ���¹���ָʾ������¼�
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

// ��������ַ�
function generateRandomChars(length) {
  const chars =
    "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ������ͻ��ı�����
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
    // ��ǰ��������
    const current = this.wordIndex % this.words.length;
    // ��ȡ�����ı�
    const fullTxt = this.words[current];

    // ����Ƿ���ɾ��״̬
    if (this.isDeleting) {
      // �Ƴ��ַ�
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // ����ַ�
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // �����ı�
    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // ��ʼ�����ٶ�
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // ��������һ������
    if (!this.isDeleting && this.txt === fullTxt) {
      // �ڵ���ĩβͣ��
      typeSpeed = this.wait;
      // ����ɾ��״̬
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // �ƶ�����һ������
      this.wordIndex++;
      // ����ǰ��ͣ
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ��ʼ�����ͻ�Ч��
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".subtitle");
  if (txtElement) {
    const words = [
      "��ӭ�����ҵ�����",
      "����һ��������",
      "����һ�����ʦ",
      "����һ��������",
    ];
    new TypeWriter(txtElement, words, 3000);
  }
}
