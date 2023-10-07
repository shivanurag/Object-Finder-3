objects=[];
status="";
input_value="";
function setup()
{
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input_value=document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("Model loaded");
    status=true;
}

function draw()
{
    image(video,0,0,300,300);
    if(status!="")
    {
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++)
        {
            percent=floor(objects[i].confidence*100);
            fill("#f74d40");
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#f74d40");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==input_value)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=input_value+"Found";
                var synth = window.speechSynthesis;
                speak_data = objects[i].label;
                utterThis = new SpeechSynthesisUtterance(input_value);
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("status").innerHTML="Object Not Found";
            }
        }
       
    }
}

function gotResult(error,result)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(result);
        objects=result;
    }
}