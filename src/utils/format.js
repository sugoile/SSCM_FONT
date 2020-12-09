//日期格式
export function FormatDateTime(time) {
    function add0(m) {
      return m < 10 ? '0' + m : m
    };
    if (time === null || time === '') {
      return 'N/A';
    };
    let date = new Date(time);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate() + 1;
    let h = date.getHours() + 1;
    let mm = date.getMinutes() + 1;
    let s = date.getSeconds() + 1;
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
  }

  //空值格式
 export function Nullexpress(value) {
    if (value === null || value === '') {
      return 'N/A';
    } else {
      return value;
    }
  }

  //图片格式(true || false)
export function FormatPicture(file) {
  const isJPEG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isJPG = file.type === 'image/jpg';
  const isPG = (isJPG || isPNG || isJPEG);
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isPG) {
    this.$message.error('上传图片只能是 JPG 或 PNG 或 JPEG 格式!');
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 2MB!');
  }
  return isPG && isLt2M
}
