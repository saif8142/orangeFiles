var searchIds =[];
var searNames=[];
const browserCommonId="browser123";
const developerCommonId="developTool123";
const msgsCommonId="Msgs123";
var collectionName;
var queryByName;
  
    
//browsers data get from firestore database
db.collection('Best_Browser').get().then((snapshot) =>{

    snapshot.docs.forEach(doc =>{
       
        browsersDataDisplay(doc);

    });

    
    });

   function browsersDataDisplay(doc)
    {
       console.log(doc);
        $("#browserDiv").append('<div class="box" id="'+doc.id+'"><div class="container-left"><div class="icon"><img class="containericon" src="'+doc.data().Image+'"></div></div><div class="container-right"><div class="content"><h1>'+doc.data().Name+'</h1><p>'+doc.data().BrowserDes+'</p><a href="#">Download Now</a></div></div></div>');

    }

    //msgs Apps data get from firestore

    db.collection('Best_MsgsApp').get().then((snapshot) =>{

        snapshot.docs.forEach(doc =>{
           
            msgsAppDataDisplay(doc);
    
        });
    
        
       });
    
       function msgsAppDataDisplay(doc)
        {
           
    
    
            $("#msgsAppDiv").append('<div class="box" id="'+doc.id+'"><div class="container-left"><div class="icon"><img class="containericon" src="'+doc.data().Image+'"></div></div><div class="container-right"><div class="content"><h1>'+doc.data().Name+'</h1><p>'+doc.data().mAppDes+'</p><a href="#">Download Now</a></div></div></div>');
    
        }


         //developer tools data get from firestore

    db.collection('Best_Developer').get().then((snapshot) =>{

        snapshot.docs.forEach(doc =>{
           
            devAppDataDisplay(doc);
    
        });
    
        
       });
    
       function devAppDataDisplay(doc)
        {
           
    
    
            $("#devAppDiv").append('<div class="box" id="'+doc.id+'"><div class="container-left"><div class="icon"><img class="containericon" src="'+doc.data().Image+'"></div></div><div class="container-right"><div class="content"><h1>'+doc.data().Name+'</h1><p>'+doc.data().DevDes+'</p><a href="#">Download Now</a></div></div></div>');
    
        }


      
        var searchKeys= databaseCon.ref('/SearchKeyWords');
        

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
          var availableTags = [
              "ActionScript",
              "AppleScript",
              "Asp",
              "BASIC",
              "C",
              "C++",
              "Clojure",
              "COBOL",
              "ColdFusion",
              "Erlang",
              "Fortran",
              "Groovy",
              "Haskell",
              "Java",
              "JavaScript",
              "Lisp",
              "Perl",
              "PHP",
              "Python",
              "Ruby",
              "Scala",
              "Scheme"];
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
                     getUids(sVal,sId);

                 }


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



                     });
                     
                 
                     
                     }).catch((erorr)=>{
 
                         console.log("Error getting documents: ", erorr);
                     });
                  
                
          
                
            }



          });
      });