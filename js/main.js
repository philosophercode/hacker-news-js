// const storiesDiv = document.querySelector("ul");
const storiesDiv = document.querySelector("#stories");
const articleDiv = document.querySelector("#article");

const getStories = async () => {
    let articlesArray = [];
    const articles  = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    const json = await articles.json();
    console.log(json);
    articleNumber = json.length;
    
    json.map(async (articleID, index)=>{
        const article = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleID}.json?print=pretty`);
        const articleJson = await article.json();
        articlesArray.push(articleJson);


        let liTitle = document.createElement("li");
        liTitle.setAttribute('class', 'title')
        let liTime = document.createElement("li");
        liTime.setAttribute('class', 'time')
        let liScore = document.createElement("li");
        liScore.setAttribute('class', 'score');
        
        
        const title = articleJson.title;
        const time = getTime(articleJson.time);
        const score = articleJson.score;
        
        articlesArrLen = articlesArray.length;
        
        liTitle.value = articlesArrLen - 1;
        liTitle.innerHTML = `${articlesArrLen}. ${title}`;
        liTitle.onclick = () => {
            const clickedArticle = articlesArray[liTitle.value];
            console.log(liTitle.value);
            console.log(clickedArticle);
            setArticle(clickedArticle);
        };
        // document.body.appendChild(liTitle);
        storiesDiv.appendChild(liTitle);
        if (articleJson.url != undefined) {
            let liUrl = document.createElement("li");
            liUrl.setAttribute('class', 'url');
            let aTag = document.createElement("a");
            aTag.innerHTML = articleJson.url;
            aTag.href = articleJson.url;
            liUrl.appendChild(aTag);
            storiesDiv.appendChild(liUrl);            
        }


        

        liTime.innerHTML = `Time: ${time}`;
        // document.body.appendChild(liTime);
        storiesDiv.appendChild(liTime);
        
        liScore.innerHTML = `Score: ${score}`;
        document.body.appendChild(liScore);
        storiesDiv.appendChild(liScore);

        if (articlesArray.length == articleNumber) {
            console.log(articlesArray);
        }
      
    })
}

const getTime = (time) => {
    let date = new Date(0);
    date.setUTCSeconds(time);
    return date.toLocaleString();
}

const setArticle = (article) => {

}

const refresh = () => {
    try {
        window.stop();
    } catch (exception) {
        document.execCommand('Stop');
    }
    const myNode = document.getElementById("stories");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    getStories();
}


getStories();