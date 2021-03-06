/* public/script.js */

window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    /* AUTH STUFF */
    // var lock = new Auth0Lock('VZNkO2UEcWKgJmMQGjpb03WBzKq9SwCa', 'app43832868.eu.auth0.com');

    // var userProfile = null;

    // document.getElementById('btn-login').addEventListener('click', function() {
    //     lock.show({ authParams: { scope: 'openid' } });
    // });
    // var hash = lock.parseHash(window.location.hash);

    // if (hash && hash.id_token) {
    //   //save the token in the session:
    //   localStorage.setItem('id_token', hash.id_token);
    // }

    // if (hash && hash.error) {
    //   alert('There was an error: ' + hash.error + '\n' + hash.error_description);
    // }
    // //retrieve the profile:
    // var id_token = localStorage.getItem('id_token');
    // if (id_token) {
    //   lock.getProfile(id_token, function (err, profile) {
    //     if (err) {
    //       return alert('There was an error geting the profile: ' + err.message);
    //     }
    //     document.getElementById('name').textContent = profile.name;
    //   });
    // }
    // var getFoos = fetch('/', {
    //   headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    //   },
    //   method: 'GET',
    //   cache: false
    // });

    // getFoos.then(function (response) {
    //   response.json().then(function (foos) {
    //     console.log('the foos:', foos);
    //   });
    // });
    /* END OF AUTH STUFF */

    // make the tab act like a tab
    pad.addEventListener('keydown',function(e) {
        if(e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = target.value;

            // set textarea value to: text before caret + tab + text after caret
            target.value = value.substring(0, start)
                            + "\t"
                            + value.substring(end);

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            e.preventDefault();
        }
    });

    var previousMarkdownValue;          

    // convert text area to markdown html
    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function(){
        if(previousMarkdownValue != pad.value){
            return true;
        }
        return false;
    };

    // check every second if the text area has changed
    setInterval(function(){
        if(didChangeOccur()){
            convertTextAreaToMarkdown();
        }
    }, 1000);

    // convert textarea on input change
    pad.addEventListener('input', convertTextAreaToMarkdown);

    // ignore if on home page
    if(document.location.pathname.length > 1){
        // implement share js
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });        
    }

    // convert on page load
    convertTextAreaToMarkdown();

};
/* MENU */
$('.nav.nav-sidebar').on('click', 'li', function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
});
// console.log(document.location.href)
/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

// See the Getting Started docs for more information:
// http://getbootstrap.com/getting-started/#support-ie10-width

(function () {
  'use strict';

  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.querySelector('head').appendChild(msViewportStyle)
  }

})();