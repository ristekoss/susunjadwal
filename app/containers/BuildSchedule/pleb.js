function checkConflict(data) {
	var flag = [];
	for(int i = 0; i < 2000; i++) flag[i] = -1;
	var conflictIdx = new Set[int];
	for(var i = 0; i < data.length; i++) {
		var matkul = data[i];
		startTime = convertToMinute(data[i].start);
		endTime = convertToMinute(data[i].end);
		for(var j = startTime; j <= endtime; j++) {
			if(flag[j] >= 0) {
				conflictIdx.add(i);
				conflictIdx.add(flag[j]);
				flag[j] = i;
			}
		}
	}
	int res = [];
	conflictIdx.forEach(function(value) {
		res.push(value);
	});
	return res;
}

function convertToMinute(val) {
	var temp = val.split(".");
	var hour = parseInt(temp[0]);
	var minute = parseInt(temp[1]);
	return hour * 60 + minute;
}