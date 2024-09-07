import html2canvas from 'html2canvas';

export const exportToPng = (containerID, fileName = 'chart.png') => {
    html2canvas(document.getElementById(containerID)).then(function(canvas) {

        function callback(blob) {
            const url = URL.createObjectURL(blob);
            const element = document.createElement('a');
            element.href = url;
            element.download = fileName;  // Set the desired file name here
            element.click();
        }

        canvas.toBlob(callback);
    });
};
