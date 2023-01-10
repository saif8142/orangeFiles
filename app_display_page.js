var searchKeys= databaseCon.ref('/SearchKeyWords');
var searchIds =[];
var searNames=[];
const browserCommonId="browser123";
const developerCommonId="developTool123";
const msgsCommonId="Msgs123";
var collectionName;
var queryByName;

var appVal;
var appId;

function funLoad()
{


   appVal= sessionStorage.getItem("sVal");
    appId= sessionStorage.getItem("sId");
    console.log(appVal);
    console.log(appId);
    getUids(appVal,appId);
    

    searchKeys.on('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
          childSnapshot.forEach(function(secsnap)
          {
            if(secsnap.key=="CommonId")
            {
            searchIds.push(secsnap.val());
            }
            if(secsnap.key=="KeyName")
            {
                searNames.push(secsnap.val());
            }




        });
             
    });
 });



 console.log(searchIds);
        console.log(searNames);

        //jquery autocomplete text
        $(function () {
          
          $("#developer").autocomplete({
              source: searNames
          });
      });
      $(document).ready(function () {


        var sVal;
        var sId;
          $('#developer').on('change', function () {
             // $('#tagsname').html('You selected: ' + this.value);
             //console.log('You selected: ' + this.value);
          }).change();
          $('#developer').on('autocompleteselect', function (e, ui) {
              //$('#tagsname').html('You selected: ' + ui.item.value);
              //console.log('You selected: ' + ui.item.value);

             for(let v=0;v<searNames.length;v++)
             {
                 if(ui.item.value==searNames[v])
                 {
                     console.log(searNames[v]);
                     sVal=searNames[v];
                     sId=searchIds[v];
                     console.log(searchIds[v]);
                     //getUids(sVal,sId);

                 }


             }

             
           


          });
      });


 
}
function getUids(sval,sId)
{
    if(sId==browserCommonId)
    {
        collectionName="Best_Browser";
        //queryByName="BrowserName";
    }
    if(sId==developerCommonId)
    {
        collectionName="Best_Developer";
        //queryByName="DevName";
    }
    if(sId==msgsCommonId)
    {
        collectionName="Best_MsgsApp";
        //queryByName="mAppName";
    }
    console.log(collectionName);

    db.collection(collectionName).where('Name', "==", sval).get().then((snapshot) =>{

    
          snapshot.forEach((doc)=>{
           
            console.log(doc.id, "=>", doc.data().CommonId,"=" ,doc.data().Name);
            $("#appDisp").append('<h2 style="color:black;">'+doc.data().Name+'</h2><p style="color:black;"><img src="'+doc.data().Image+'" style="width:150px;height:120px;float:left;font-family: Times New Roman, Times, serif;">'+doc.data().Des+'</p><br><br><br><center><input type="button" id="'+doc.id+'" value="Download" style="background-color:rgb(155, 104, 10);color:#ffff;width:150px;height:40px;border-radius:10px;cursor:pointer;"></center>');



         });
         
     
         
         }).catch((erorr)=>{

             console.log("Error getting documents: ", erorr);
         });
      
    

    
}
