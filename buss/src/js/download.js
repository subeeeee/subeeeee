function StandardPost2NewWindow(url, args,_this,type) {
    // this.$confirm('您即将下载资料包，资料包的下载可能需要几十秒，请您不要关闭新打开的网页。', '提示', {
    //     confirmButtonText: '我知道了',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
        let body = $(document.body);
        let form = $("<form method='post' target='_blank'></form>");
        let input;
        form.attr({
            "action" : url
        });
        if (args) {
            $.each(args, function(key, value) {
                input = $("<input type='hidden'>");
                input.attr({
                    "name" : key
                });
                input.val(value);
                form.append(input);
            });
        }
        form.appendTo(body);
        form.submit();
      // })
}

export default {StandardPost2NewWindow}
