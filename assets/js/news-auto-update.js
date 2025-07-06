// 配置法律资讯源
const newsSources = {
    // 最高人民法院权威发布
    supremeCourt: {
        name: "最高人民法院",
        url: "http://www.court.gov.cn/xwzx/fyxw/index.html",
        api: "https://api.rss2json.com/v1/api.json?rss_url=http://www.court.gov.cn/xwzx/fyxw/rss.xml",
        maxItems: 5
    },
    
    // 中国政府网法律法规
    govLaws: {
        name: "中国政府网",
        url: "http://www.gov.cn/zhengce/xxgk/flfg.htm",
        api: "https://api.rss2json.com/v1/api.json?rss_url=http://www.gov.cn/zhengce/flfg/rss.xml",
        maxItems: 5
    },
    
    // 法律图书馆新法规速递
    lawBook: {
        name: "法律图书馆",
        url: "http://www.law-lib.com/law/",
        api: "https://api.rss2json.com/v1/api.json?rss_url=http://www.law-lib.com/rss/lawnew.xml",
        maxItems: 5
    }
};

// 定时更新设置
const updateInterval = 3600000; // 1小时更新一次 (单位: 毫秒)

// 获取并显示法律资讯
async function fetchLegalNews() {
    try {
        // 1. 获取最高人民法院新闻
        const courtNews = await fetchNews(newsSources.supremeCourt);
        displayNews(courtNews, 'courtNewsList');
        
        // 2. 获取法律法规更新
        const lawUpdates = await fetchNews(newsSources.govLaws);
        displayNews(lawUpdates, 'lawUpdateList');
        
        // 3. 获取实务文章
        const articles = await fetchNews(newsSources.lawBook);
        displayNews(articles, 'articleList');
        
        // 更新最后获取时间
        document.getElementById('updateTime').textContent = new Date().toLocaleString();
    } catch (error) {
        console.error('获取法律资讯失败:', error);
        document.getElementById('updateTime').textContent = '更新失败，请稍后刷新';
    }
}

// 从API获取数据
async function fetchNews(source) {
    const response = await fetch(source.api);
    const data = await response.json();
    
    return {
        source: source.name,
        url: source.url,
        items: data.items.slice(0, source.maxItems)
    };
}

// 显示资讯内容
function displayNews(data, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    data.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'rss-feed-item';
        
        // 提取纯文本日期（去除可能的多余字符）
        const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : '';
        
        itemElement.innerHTML = `
            <h4><a href="${item.link}" target="_blank">${item.title}</a></h4>
            <p>${item.description || ''}</p>
            <div class="rss-meta">
                <span>来源: ${data.source}</span>
                ${pubDate ? `<span> | 发布日期: ${pubDate}</span>` : ''}
            </div>
        `;
        
        container.appendChild(itemElement);
    });
}

// 页面加载时立即获取一次
document.addEventListener('DOMContentLoaded', fetchLegalNews);

// 设置定时更新
setInterval(fetchLegalNews, updateInterval);

// 添加手动刷新按钮功能
document.querySelector('.update-status').addEventListener('click', fetchLegalNews);