var SaveDiv;
var GlobalList;

var lon;
var lat;

function selectPlace(inum) {  //지역 선택 시 화면 전환 함수 
    var list = $.parseJSON(GlobalList[inum]);
    popUpClose();
    panTo(list['mapy'], list['mapx']);

    $("#viewDiv").css("top", "-.5em");
    $("#viewDiv").css("left", "-.5em");

}

function popUpClose() {
    $("#popup_mask").css("display", "none"); //팝업창 뒷배경 display none
    $("#popupDiv").css("display", "none"); //팝업창 display none
    $("body").css("overflow", "auto");//body 스크롤바 생성
}

//function keywordSearch(jdata) { //키워드 검색 함수  

//     //이전 검색결과의 마커랑 오버레이 전부 비우기 
//     hideOverlays();
//     hideMarkers();

//     markers = []; 
//     overlays = [];

//     $("#popup_mask").css("display","block"); //팝업 뒷배경 display block
//     $("#popupDiv").css("display","block"); //팝업창 display block
//     //새로운 지역 검색시 팝업창 내용 초기화 
//     searchswiper.removeAllSlides();

//     GlobalList = jdata;
//     for(var item in jdata){
//         var list = $.parseJSON(jdata[item]);
//         if(viewMode == 1)
//         {
//             SetMarker(item, marker_basic);
//         }
//         else
//         {
//             SetMarker(item, photo_basic);
//         }
//         var Ddata = "<div id ="+item+" class='items swiper-slide' onclick='selectPlace(\"" + item + "\")'>"+list['title']+"</div>";
//         searchswiper.appendSlide(Ddata); //popupdiv 슬라이드에 item 데이터 추가  
//     }
//     checkSearch = 1;
//     $("#popCloseBtn").click(function(event){
//         popUpClose(); 
//     });
// }

function locationSearch(jdata) { //현위치 기반 검색 함수  

    //이전 검색결과의 마커랑 오버레이 전부 비우기 

    hideOverlays();
    hideMarkers();

    var imageSize = new kakao.maps.Size(24, 35);
    // 마커 이미지를 생성합니다
    if (viewMode == 1) {
        var markerImage = new kakao.maps.MarkerImage(marker_basic, imageSize);
    }
    else {
        var markerImage = new kakao.maps.MarkerImage(photo_basic, imageSize);
    }
    var temp = $("#gpsLoc").text().split(":");

    map.setLevel(6);
    panTo(parseFloat(temp[1]), parseFloat(temp[0]));


    markers = [];
    overlays = [];

    GlobalList = jdata;

    //새로운 지역 검색시 팝업창 내용 초기화 
    searchswiper.removeAllSlides();

    for (var item in jdata) {
        var list = $.parseJSON(jdata[item]);
        if (viewMode == 1) {
            SetMarker(list, marker_basic);
        }
        else {
            SetMarker(list, photo_basic);
        }
        //var Ddata = "<div id =" + item + " class='items' onclick='selectPlace(\"" + item + "\")'>" + list['title'] + "</div>";

        //searchswiper.appendSlide(Ddata);
    }
    // 현재위치 마커 설정
    lon = parseFloat(temp[0]);
    lat = parseFloat(temp[1]);
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(parseFloat(temp[1]), parseFloat(temp[0])), // 마커를 표시할 위치
        title: "현재위치", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지 
    });

    markers.push(marker);
}