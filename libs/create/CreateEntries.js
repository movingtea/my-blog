import axios from 'axios'

export async function Createtags(num) {
    const request = {
        "tag": `测试标签${num}`,
        "posts": ["14"],
        'createdAt': (new Date()).toISOString(),
        'updatedAt': (new Date()).toISOString(),
        'publishedAt': (new Date()).toISOString(),
        'createdBy': '1',
        'updatedBy': '1'
    }
    try {
        return await axios.post(`${process.env.API_BASE_URL}/api/tags`, {
            "data": request
        })
    } catch (e) {
        console.log(e)
    }
}

export async function CreatePosts(num) {
    console.log(num)
    const request = {
        'category': Math.ceil(Math.random() * 3),
        'content': `{\"time\":${Date.now()},\"blocks\":[{\"id\":\"Zv8_5Xatc2\",\"type\":\"paragraph\",\"data\":{\"text\":\"Aenean ornare ligula vel augue pulvinar vulputate. Aenean eget iaculis libero. Ut vel lectus congue, condimentum nisi convallis, feugiat magna. Donec urna elit, scelerisque eget mauris eget, rutrum aliquam ante. Morbi faucibus dictum enim, in varius mi sollicitudin ullamcorper. Donec ut nisi id dui faucibus scelerisque pharetra eget tortor. Duis nec aliquet justo, sed vulputate leo. Ut ut consequat justo, et aliquet libero. Pellentesque dui metus, tincidunt maximus consequat sit amet, lacinia sit amet nibh. Cras rutrum vestibulum varius. Vivamus maximus lorem ac massa aliquet euismod id in diam. Phasellus vitae odio suscipit, suscipit elit eget, dictum sapien.\"}}],\"version\":\"2.23.2\"}`,
        'cover': 3,
        'description': "菊功毒间怠！搏暑稼盲纽摸！句考申绝柬笼姑氰纸渔屋外皮最抛银锭铃僚慧颌纬摧部资胁吹屏哗绵珠损，领磷楚蛾挥卜买缘蛇斑好弓挣级门斤份脊嫌组斋毒涤绑南叨昏怪椰尺。雪甘拼猾晋李踪同，拱辑肃卿讽窄汇凭范勃兹祖档防；廊八展食泄答费盘，侮悟拧熔碍笨凝迪俭发！扶栓祸苏胸蓟想问毁选艘称碰…善壮雨害蹈准茄养逞红丸钵夕殖台蛋！",
        'tag': [`${Math.ceil(Math.random() * (93 - 69 + 1) + 69)}`, `${Math.ceil(Math.random() * (93 - 69 + 1) + 69)}`],
        'title': `test article ${num}`,
        'slug': `test-article-${num}`,
    }
    try {
        return await axios.post(`${process.env.API_BASE_URL}/api/posts`, {
            "data": request
        })
    } catch (e) {
        console.log(e)
    }
}