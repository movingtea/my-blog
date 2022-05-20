import axios from 'axios'

export async function Createtags(num) {
    const request = {
        "tag": `测试标签${num}`,
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
        'category': Math.ceil(Math.random() * 6),
        'content': `{\"time\":${Date.now()},\"blocks\":[{\"id\":\"Zv8_5Xatc2\",\"type\":\"paragraph\",\"data\":{\"text\":\"Aenean ornare ligula vel augue pulvinar vulputate. Aenean eget iaculis libero. Ut vel lectus congue, condimentum nisi convallis, feugiat magna. Donec urna elit, scelerisque eget mauris eget, rutrum aliquam ante. Morbi faucibus dictum enim, in varius mi sollicitudin ullamcorper. Donec ut nisi id dui faucibus scelerisque pharetra eget tortor. Duis nec aliquet justo, sed vulputate leo. Ut ut consequat justo, et aliquet libero. Pellentesque dui metus, tincidunt maximus consequat sit amet, lacinia sit amet nibh. Cras rutrum vestibulum varius. Vivamus maximus lorem ac massa aliquet euismod id in diam. Phasellus vitae odio suscipit, suscipit elit eget, dictum sapien.\"}}],\"version\":\"2.23.2\"}`,
        'cover': Math.ceil(Math.random() * 30),
        'description': "菊功毒间怠！搏暑稼盲纽摸！句考申绝柬笼姑氰纸渔屋外皮最抛银锭铃僚慧颌纬摧部资胁吹屏哗绵珠损，领磷楚蛾挥卜买缘蛇斑好弓挣级门斤份脊嫌组斋毒涤绑南叨昏怪椰尺。雪甘拼猾晋李踪同，拱辑肃卿讽窄汇凭范勃兹祖档防；廊八展食泄答费盘，侮悟拧熔碍笨凝迪俭发！扶栓祸苏胸蓟想问毁选艘称碰…善壮雨害蹈准茄养逞红丸钵夕殖台蛋！",
        'tags': [`${Math.ceil(Math.random() * (50 - 32 + 1))}`, `${Math.ceil(Math.random() * (100 - 51 + 1) + 51)}`],
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

export async function UpdatePostsCovers(num) {
    const request = {
        //'cover': Math.ceil(Math.random() * 29),
        //'category': `${Math.ceil(Math.random() * 6)}`,
        'tags': [`${Math.ceil(Math.random() * 10)}`, `${Math.ceil(Math.random() * (20 - 11 + 1) + 11)}`]
    }
    console.log('tag', request)
    try {
        return await axios.put(`${process.env.API_BASE_URL}/api/posts/${num}`, {
            "data": request
        })
    } catch (e) {
        console.log(e)
    }
}