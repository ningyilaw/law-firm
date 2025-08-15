document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 1. 获取表单数据（根据你的实际字段调整）
            const formData = {
                name: document.getElementById('name')?.value.trim(),
                phone: document.getElementById('phone')?.value.trim(),
                email: document.getElementById('email')?.value.trim(),
                service: document.getElementById('service')?.value,
                message: document.getElementById('message')?.value.trim()
            };
            
            // 2. 验证逻辑（保持和原代码一致）
            if (!formData.name || !formData.phone || !formData.service || !formData.message) {
                alert('请填写所有必填字段');
                return;
            }
            if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
                alert('请输入有效的手机号码');
                return;
            }
            if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                alert('请输入有效的电子邮件地址');
                return;
            }

            // 3. 创建隐藏iframe实现静默提交
            const iframe = document.createElement('iframe');
            iframe.name = 'formsubmit-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // 4. 设置表单目标和属性
            this.target = 'formsubmit-iframe';
            this.action = 'https://formsubmit.co/13248230746@163.com'; // 替换为你的邮箱
            this.method = 'POST';

            // 5. 添加FormSubmit所需隐藏字段
            addHiddenInput(this, '_next', window.location.href); // 提交后返回当前页
            addHiddenInput(this, '_captcha', 'false');
            addHiddenInput(this, '_template', 'table'); // 让邮件以表格形式展示

            // 6. 显示提交状态
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '提交中...';
            }

            // 7. 实际提交表单
            this.submit();

            // 8. 显示成功消息（因为用了iframe，页面不会跳转）
            showSuccessMessage(this);

            // 辅助函数：添加隐藏字段
            function addHiddenInput(form, name, value) {
                let input = form.querySelector(`input[name="${name}"]`);
                if (!input) {
                    input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = name;
                    form.appendChild(input);
                }
                input.value = value;
            }

            // 辅助函数：显示成功UI
            function showSuccessMessage(form) {
                form.innerHTML = `
                    <div class="form-success" style="text-align: center; padding: 20px;">
                        <i class="fas fa-check-circle" style="color: #28a745; font-size: 50px;"></i>
                        <h3 style="color: #28a745;">提交成功！</h3>
                        <p>我们已收到您的咨询请求，专业律师将在24小时内与您联系。</p>
                    </div>
                `;
            }
        });
    }
});
