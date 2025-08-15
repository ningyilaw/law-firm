// 联系表单处理
// 联系表单处理（修改版）
        document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // 获取表单数据
                    const formData = {
                        name: document.getElementById('name').value.trim(),
                        phone: document.getElementById('phone').value.trim(),
                        email: document.getElementById('email').value.trim(),
                        service: document.getElementById('service').value,
                        message: document.getElementById('message').value.trim()
                    };
                    
                    // 验证逻辑
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
                    
                    // 显示加载状态
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    const originalBtnText = submitBtn.textContent;
                    submitBtn.disabled = true;
                    submitBtn.textContent = '提交中...';
                    
                    // 创建临时iframe实现表单提交
                    const iframe = document.createElement('iframe');
                    iframe.name = 'formsubmit-iframe';
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                    
                    // 设置表单target
                    contactForm.target = 'formsubmit-iframe';
                    
                    // 显示成功消息
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <h3>提交成功！</h3>
                        <p>我们已收到您的咨询请求，专业律师将在24小时内与您联系。</p>
                    `;
                    
                    const formContainer = contactForm.parentElement;
                    formContainer.insertBefore(successMessage, contactForm);
                    contactForm.style.display = 'none';
                    
                    // 实际提交表单
                    contactForm.submit();
                    
                    // 3秒后重置表单
                    setTimeout(() => {
                        formContainer.removeChild(successMessage);
                        contactForm.style.display = 'block';
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                        contactForm.reset();
                    }, 5000);
                });
            }
            
            // 常见问题切换（保持原样）
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const faqItem = this.parentElement;
                    const answer = this.nextElementSibling;
                    const icon = this.querySelector('i');
                    
                    faqItem.classList.toggle('active');
                    
                    if (faqItem.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        answer.style.maxHeight = '0';
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                });
            });
        });
