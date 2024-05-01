export function extractContent(s, space) {
  var span = document.createElement("span");
  span.innerHTML = s;
  var preElements = span.querySelectorAll("pre");
  preElements.forEach((preElement) => {
    preElement.textContent = "";
  });

  if (space) {
    var children = span.querySelectorAll("*");
    for (var i = 0; i < children.length; i++) {
      if (children[i].textContent) children[i].textContent += " ";
      else children[i].innerText += " ";
    }
  }

  return [span.textContent || span.innerText].toString().replace(/ +/g, " ");
}

export const ParseDate = (date) => {
  const event = new Date(date);
  const currentDate = new Date();

  const timeDiffInMilliseconds = currentDate.getTime() - event.getTime();
  const timeDiffInHours = Math.floor(timeDiffInMilliseconds / (1000 * 60 * 60));

  if (timeDiffInHours < 24) {
    return `${timeDiffInHours} hours ago`;
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = event.getMonth();
    const month = months[monthIndex];

    const day = event.getDate();
    const year = event.getFullYear();

    return `${month} ${day}, ${year}`;
  }
};

export const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ header: [1, 2,3, false] }],     
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [ 'code-block'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }], 
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link','video',"image"],  ['clean']    
    ],
    
  };
export const getCurrentTimeInUTCFormat = () => {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getUTCDate()).padStart(2, '0');
  const hours = String(currentDate.getUTCHours()).padStart(2, '0');
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(currentDate.getUTCMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};