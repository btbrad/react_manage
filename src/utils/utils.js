export default {
    formatDate(time){
        if(!time) return '';
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dateString = `${year}年${month}月${day}日   ${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}:${seconds>=10?seconds:'0'+seconds}`;
        return dateString;
    }
}