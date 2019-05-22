

let currentTab = "";

function showTab1() {
    if (currentTab != "Tab1") {
        currentTab = "Tab1";
        showNoTabs(); 
        document.getElementById("Tab1").style.backgroundColor = "lightBlue";
        document.getElementById("Section1").style.display = "inline";
    }
}

function showTab2() {
    if (currentTab != "Tab2") { //when not on this tab, when switched to it will call functions
        currentTab = "Tab2";
        showNoTabs();
        getCourses(); //on loading a tab it will call the function, refreashing each load 
        document.getElementById("Tab2").style.backgroundColor = "lightBlue";
        document.getElementById("Section2").style.display = "inline";
    }
}

function showTab3() {
    if (currentTab != "Tab3") {
        currentTab = "Tab3";
        showNoTabs();
        getPeople();
        document.getElementById("Tab3").style.backgroundColor = "lightBlue";
	    document.getElementById("Section3").style.display = "inline";
    }
}
function showTab4() {
    if (currentTab != "Tab4") {
        currentTab = "Tab4";
        showNoTabs();
        getNews();
        document.getElementById("Tab4").style.backgroundColor = "lightBlue";
        document.getElementById("Section4").style.display = "inline";
    }
}
function showTab5() {
    if (currentTab != "Tab5") {
        currentTab = "Tab5";
        showNoTabs();
        getNotices();
        document.getElementById("Tab5").style.backgroundColor = "lightBlue";
        document.getElementById("Section5").style.display = "inline";
    }
}
function showTab6() {
    if (currentTab != "Tab6") {
        currentTab = "Tab6";
        showNoTabs();
        getComment();
        document.getElementById("Tab6").style.backgroundColor = "lightBlue";
        document.getElementById("Section6").style.display = "inline";
    }
}

function showNoTabs() {
    document.getElementById("Tab1").style.backgroundColor = "transparent";
    document.getElementById("Tab2").style.backgroundColor = "transparent";
    document.getElementById("Tab3").style.backgroundColor = "transparent";
    document.getElementById("Tab4").style.backgroundColor = "transparent";
    document.getElementById("Tab5").style.backgroundColor = "transparent";
    document.getElementById("Tab6").style.backgroundColor = "transparent";

    document.getElementById("Section1").style.display = "none";
    document.getElementById("Section2").style.display = "none";
    document.getElementById("Section3").style.display = "none";
    document.getElementById("Section4").style.display = "none";
    document.getElementById("Section5").style.display = "none";
    document.getElementById("Section6").style.display = "none";
}
function getCourses() {
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/courses"; //url it will pull objects from
	const xhr = new XMLHttpRequest();
   	xhr.open("GET", uri, true); //gets JSON object
   	xhr.onload = () => { //enables refreash-ability of tabs 
     	const resp = JSON.parse(xhr.responseText);
     	showCourse(resp.data); //loads JSON object to tab, 'data' is tag in JSON document which objects are in
   }
   xhr.send(null);
}

function showCourse(courses) {
   	let courseList= [];
   	const addCourse = (course) => {
   		courseList.push(
				"</br><div id='courseTitle'>" + "<b>" + course.subject + " " + course.catalogNbr + "</b>" +
				"<br>" + "<b>" + course.titleLong + "</div></b>" +
				"<div id='coursePrereq'>" + course.rqrmntDescr + "</div>" +
				"<div id='courseDescr'>" + course.description + "</div></br>" +
				"<div id='timetableLink'><a href=''>Timetable</a></div>"); //pushes JSON objects to a list, easier than a table
   	}
/*
	function getTimetable() {
		const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/course";
		const xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
   		xhr.onload = () => {
     		const resp = JSON.parse(xhr.responseText);
     		showPeople(resp.data);
   		}
   		xhr.send(null);	
	}

*/
   	courses.forEach(addCourse)
   	document.getElementById("showCourseList").innerHTML = courseList.sort().join("</br>");
};

function getPeople() {
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/people";
	const xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
   	xhr.onload = () => {
     	const resp = JSON.parse(xhr.responseText);
     	showPeople(resp.list);
   }
   xhr.send(null);	
}

function showPeople(peoples) {
	let peopleTable = "</br><tr class='peopleTable'><th>Name</th><th>Position</th><th>Email</th><th>Phone</th><th>VCard</th></tr>\n";
	let odd = true;
	const addPeople = (people) => {

		const pic = "<img id='peoplepics' src='https://unidirectory.auckland.ac.nz/people/imageraw/" + people.profileUrl[1] + "/" + people.imageId + "/small'>";
		const name = people.firstname + " " + people.lastname + "</br>";
		const position = people.jobtitles;
		const phone = "<a href='tel:+64 9 373 7999" + people.extn + "'>" + people.extn + "</a>";
		const email = "<a href='mailto:" + people.emailAddresses + "'>" + people.emailAddresses + "</a>";
		const vcard = "<a class='cardpic' href='http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/vcard?u=" + people.profileUrl[1] + "'>" + "&#128179" + "</a>";

		peopleTable += odd ? "<tr class='peopleOdd'>" : "<tr class='peopleEven'>"; //creates alternating classes for CSS manipulation
      	odd = !odd;

		peopleTable += "<td class='peopleName'>" + name + pic + "</td>";
		peopleTable += "<td class='peoplePosition'>" + position + "</td>";
		peopleTable += "<td class='peopleEmail'>" + email + "</td>";
		peopleTable += "<td class='peoplePhone'>" + phone + "</td>";
		peopleTable += "<td class='peopleVcard'>" + vcard + "</td></tr>\n";

	}
	peoples.forEach(addPeople)
   	document.getElementById("showPeopleTable").innerHTML = peopleTable;
}

function getNews() {
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/news";
	const xhr = new XMLHttpRequest();
   	xhr.open("GET", uri, true);
   	xhr.setRequestHeader('Accept', 'application/json');
   	xhr.onload = () => {
     	const resp = JSON.parse(xhr.responseText);
     	showNews(resp);
   }
   xhr.send(null);
}

function showNews(newsfeed) {
	let newsList = []; //empty list that will have objects pushed into it
	const addNews = (news) => {
		newsList.push(
			"</br><b><div class='newsTitle'><a href='" + news.linkField + "'>" + news.titleField + "</a></div></b>" +
			"<div class='newsDate'>" + news.pubDateField + "</div>" +
			"<div class='newsDesc'>" + news.descriptionField + "</div>"
			)
	} 
	newsfeed.forEach(addNews);
   	document.getElementById("showNewsList").innerHTML = newsList.sort().join("</br>"); //sorts objects based on iterations through the JSON
}

function getNotices() {
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/notices";
	const xhr = new XMLHttpRequest();
   	xhr.open("GET", uri, true);
   	xhr.setRequestHeader('Accept', 'application/json');
   	xhr.onload = () => {
     	const resp = JSON.parse(xhr.responseText);
     	showNotices(resp);
   }
   xhr.send(null);
}

function showNotices(noticefeed) {
	let noticeList = [];
	const addNotice = (notices) => {
		noticeList.push(
			"</br><b><div class='noticeTitle'><a href='" + notices.linkField + "'>" + notices.titleField + "</a></div></b>" +
			"<div class='noticeDate'>" + notices.pubDateField + "</div>" +
			"<div class='noticeDesc'>" + notices.descriptionField + "</div>"
			)
	} 
	noticefeed.forEach(addNotice);
   	document.getElementById("showNoticeList").innerHTML = noticeList.sort().join("</br>"); //.join<"/br"> adds a line between list objects
}

function getComment() {
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
	const xhr = new XMLHttpRequest();
	const result = document.getElementById('posts'); //will place comments in this class
   	xhr.open("GET", uri, true);
   	xhr.onload=function(){
   		result.innerHTML = xhr.responseText;
   	}
   	xhr.send(null);
}

function showComment() {
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/comment?name=";
	const xhr = new XMLHttpRequest();
	const comments = document.getElementById("userComment").value;
	const name = document.getElementById("username").value;
   	xhr.open("POST", uri+name, true);
   	xhr.setRequestHeader("Content-Type","application/json;");
   	xhr.onload = function() {
   		comments.innerHTML = xhr.responseText;
   	}
   	xhr.send(JSON.stringify(comments)); //sends user comment to JSON object as string
}