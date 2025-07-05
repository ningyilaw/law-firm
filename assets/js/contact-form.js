// 联系表单处理
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
            
            // 简单验证
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
            
            // 这里可以替换为实际的表单提交逻辑
            console.log('表单数据:', formData);
            
            // 模拟表单提交
            setTimeout(() => {
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>提交成功！</h3>
                    <p>我们已收到您的咨询请求，专业律师将在24小时内与您联系。</p>
                `;
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // 3秒后重置表单
                setTimeout(() => {
                    contactForm.innerHTML = `
                        <div class="form-group">
                            <label for="name">姓名 *</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="phone">电话 *</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">电子邮箱</label>
                            <input type="email" id="email" name="email">
                        </div>
                        
                        <div class="form-group">
                            <label for="service">咨询类型 *</label>
                            <select id="service" name="service" required>
                                <option value="">请选择咨询类型</option>
                                <option value="criminal">刑事辩护</option>
                                <option value="civil">民商事诉讼</option>
                                <option value="family">婚姻家事</option>
                                <option value="corporate">公司法务</option>
                                <option value="ip">知识产权</option>
                                <option value="other">其他</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">案情简述 *</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        
                        <button type="submit" class="btn">提交咨询</button>
                    `;
                }, 3000);
            }, 1000);
        });
    }
});