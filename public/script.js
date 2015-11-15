/* public/script.js */

window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');
    var socket = new BCSocket(null, {reconnect: true}),
        sjs = new sharejs.Connection(socket);

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
    // if(document.location.pathname.length < 2){
    //     // implement share js
    //     sharejs.open(document.location.pathname, 'text', function(error, doc) {
    //         // doc.attach_textarea(pad);
    //         doc.attachTextarea(pad);
    //         convertTextAreaToMarkdown();
    //     });        
    // }
    var doc = sjs.get('docs', document.location.pathname);

    // Subscribe to changes
    doc.subscribe();

    // This will be called when we have a live copy of the server's data.
    doc.whenReady(function() {
      console.log('doc ready, data: ', doc.getSnapshot());

      // Create a JSON document with value x:5
      if (!doc.type) doc.create('text');
      doc.attachTextarea(pad);
    });

    // convert on page load
    convertTextAreaToMarkdown();

};