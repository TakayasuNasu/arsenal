
// 社員一括登録でチェックボックスに非筒以上チェックがあれば登録ボタン押下可能に切り替え
function checkInfo() {
	var form_name = 'yammerId[]';
	var count = 0;
	for (var i = 0; i < document.staffInfo.elements[form_name].length; i++) {
		if (document.staffInfo.elements[form_name][i].checked) {count ++;};
	};
	if (count > 0) {
		document.staffInfo.regist.disabled = false;
	}else{
		document.staffInfo.regist.disabled = true;
	}
}

// 非同期で社員を登録
$(function(){
	$("#form").submit(function(){
		//選択されたチェックボックスの値を配列に保存
		var checks=[];
		$("[name='yammerId[]']:checked").each(function(){
			checks.push(this.value);
		});

		$.ajax({
			type: "POST",
			url: "regist",
			data: {"yammerId":checks},
			success: function(data){
				if(data != '') {
					console.log(data);
					location.reload();
				}
			}
		});
		return false;  //submitイベントハンドラにfalseを返し，action処理をキャンセル
	});
});

// ページ内スクロール
$(function() {
	$(".scroll").click(function(event){
		event.preventDefault();

		var url = this.href;
		var parts = url.split("#");
		var target = parts[1];

		var target_offset = $("#"+target).offset();
		var target_top = target_offset.top;

		$('html, body').animate({scrollTop:target_top}, 1500);
	});
});

