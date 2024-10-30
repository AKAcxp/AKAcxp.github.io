const canvas = document.getElementById('meteorCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 流星类
class Meteor {
    constructor() {
        this.init();
    }

    init() {
        // 设置流星的随机起始位置和角度
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.length = Math.random() * 100 + 50;
        this.speed = Math.random() * 10 + 5;
        this.angle = Math.PI / 4; // 45度角
        this.opacity = Math.random() * 0.8 + 0.2;
    }

    update() {
        // 更新流星位置
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        // 如果流星出界，则重置位置
        if (this.x > canvas.width || this.y > canvas.height) {
            this.init();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// 生成流星
let meteors = [];
for (let i = 0; i < 50; i++) {
    meteors.push(new Meteor());
}

// 动画循环
function animate() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制每个流星
    meteors.forEach(meteor => {
        meteor.update();
        meteor.draw();
    });

    requestAnimationFrame(animate);
}

// 调整窗口大小
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 开始动画
animate();
