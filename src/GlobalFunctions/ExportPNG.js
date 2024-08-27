import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

export const exportToPng = () => {
    html2canvas(document.getElementById("chart-container")).then(function(canvas) {
        // const url = canvas.toDataURL();
        // const anchor = document.createElement('a');
        // anchor.href = url;
        // anchor.click();

        function callback(blob){
            console.log(blob);
            // const file = new File(blob, "chart.png");
            const url = URL.createObjectURL(blob);
            const element = document.createElement('a');
            element.href = url;
            element.download=true;
            element.click();
        }

        canvas.toBlob(callback);
    });
};