<template>
    <view>
        <view class="uni-divider uni-divider__content">Demo</view>
        <button @click="openSQL">打开数据库</button>
        <button @click="createTable">创建表</button>
        <button @click="insertTableData">新增表数据</button>
        <button @click="selectTableData">查询表数据</button>
        <button @click="updateTableData">修改表数据</button>
        <button @click="deleteTableData">按条件删除表数据</button>
        <button @click="closeSQL">关闭数据库</button>
 
        <view class="uni-divider__content" v-for="(item,index) in listData" :key='index'>
            <view>名字:{{item.name}}</view>
            <view>内容:{{item.content}}</view>
            <view>时间:{{item.time}}</view>
        </view>
    </view>
</template>
 
<script>
    import {DB} from '@/api/sqlite.js'
    export default {
        data() {
            return {
                listData: []
            };
        },
        onLoad() {
            this.openSQL();
        },
 
        methods: {
            // 打开数据库
            openSQL() {
                // 这个是查询有没有打开数据库
                let open = DB.isOpen();
                console.log("数据库状态", open ? "开启" : "关闭");
                if (!open) {
                    DB.openSqlite()
                        .then(res => {
                            console.log("数据库已打开");
                        })
                        .catch(error => {
                            console.log("数据库开启失败");
                        });
                }
            },
 
            // 关闭数据库
            closeSQL() {
                // 这个是查询有没有打开数据库
                let open = DB.isOpen();
                if (open) {
                    DB.closeSqlite()
                        .then(res => {
                            console.log("数据库已关闭");
                        })
                        .catch(error => {
                            console.log("数据库关闭失败");
                        });
                }
            },
 
            // 创建表
            createTable() {
                let open = DB.isOpen();
                if (open) {
                    this.openSQL();
                    let sql =
                        '"id" INTEGER PRIMARY KEY AUTOINCREMENT,"name" text,"content" text,"time" text';
                    // 创建表 DB.createTable(表名, 表的列)
                    DB.createTable("chat", sql)
                        .then(res => {
                            console.log("创建chat表成功");
                        })
                        .catch(error => {
                            console.log("创建表失败");
                        });
                } else {
                    console.log("数据库未打开");
                }
            },
            // 新增表数据
            insertTableData() {
                let open = DB.isOpen();
                if (open) {
                    let arr = [{
                            name: '小明',
                            content: "你好呀"
                        },
                        {
                            name: '小红',
                            content: "HI"
                        }
                    ]
                    arr.map(item => {
                        let time = this.formatDate(new Date().getTime());
                        let sql = `'${item.name}','${item.content}','${time}'`;
                        let condition = "'name','content','time'";
                        // 新增 DB.insertTableData(表名, 对应表头列的数据)
                        DB.insertTableData("chat", sql, condition)
                            .then(res => {
                                console.log("新增数据成功");
                                this.selectTableData();
                            })
                            .catch(error => {
                                console.log("失败", error);
                            });
                    })
                } else {
                    this.showToast("数据库未打开");
                }
            },
            // 查询表数据
            selectTableData() {
                let open = DB.isOpen();
                if (open) {
                    // 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
                    DB.selectTableData("chat")
                        .then(res => {
                            console.log("contact表数据", res);
                            this.listData = res;
                        })
                        .catch(error => {
                            console.log("查询失败", error);
                        });
                } else {
                    this.showToast("数据库未打开");
                }
            },
            // 修改表数据
            updateTableData() {
                let open = DB.isOpen();
                if (open) {
                    let time = this.formatDate(new Date().getTime());
                    let data = `content = '我被修改了',time = '${time}'`;
                    // 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
                    DB.updateTableData("chat", data, "name", "小明")
                        .then(res => {
                            this.showToast("更新chat表成功");
                            this.selectTableData();
                        })
                        .catch(error => {
                            console.log("修改失败", error);
                        });
                } else {
                    this.showToast("数据库未打开");
                }
            },
 
            // 删除表数据
            deleteTableData() {
                let open = DB.isOpen();
                if (open) {
                    // 删除表 DB.deleteTableData(表名,查询条件列名,查询条件列值)
                    DB.deleteTableData("chat", "name", "小红")
                        .then(res => {
                            this.showToast("删除表数据成功");
                            this.selectTableData();
                        })
                        .catch(error => {
                            console.log("删除失败", error);
                        });
                } else {
                    this.showToast("数据库未打开");
                }
            },
 
 
 
 
 
            // 提示框
            showToast: function(str) {
                uni.showToast({
                    icon: "none",
                    title: str,
                    mask: true
                });
            },
 
            // 时间戳转年月日
            formatDate(data) {
                let now = new Date(data);
                var year = now.getFullYear(); //取得4位数的年份
                var month =
                    now.getMonth() + 1 < 10 ?
                    "0" + (now.getMonth() + 1) :
                    now.getMonth() + 1;
                var date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
                var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
                var minute =
                    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
                var second =
                    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
                return (
                    year +
                    "-" +
                    month +
                    "-" +
                    date +
                    " " +
                    hour +
                    ":" +
                    minute +
                    ":" +
                    second
                );
            }
        }
    };
</script>
<style>
 
</style>