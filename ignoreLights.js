<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Code Editor</title>

    <meta name='robots' content='noindex' />
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />

    <link href='/editor/scene/js/codemirror/lib/codemirror.css' rel='stylesheet' />
    <link href='/editor/scene/js/codemirror/addon/dialog/dialog.css' rel='stylesheet' />
    <link href='/editor/scene/js/codemirror/addon/hint/show-hint.css' rel='stylesheet' />
    <link href='/editor/scene/js/codemirror/addon/lint/lint.css' rel='stylesheet' />
    <link href='/editor/scene/js/codemirror/addon/tern/tern.css' rel='stylesheet' />
    <link href='/editor/scene/css/code_editor.css' rel='stylesheet' />
    <link rel='icon' type='image/png' href='//s3-eu-west-1.amazonaws.com/static.playcanvas.com/images/icons/favicon_code.png' />
</head>
<body>
    <script>
        var config = {"self":{"id":22266,"username":"runninglvlan"},"accessToken":"8vvpia3b65osqgjqsmzg9yi2fch9i9we","project":{"id":381333,"name":"Robot Impact","permissions":{"admin":[22266],"write":[70469],"read":[]},"private":false,"repositories":{"current":"directory"}},"file":{"name":"ignoreLights.js"},"title":"ignoreLights.js | Code Editor","url":{"api":"https://playcanvas.com/api","home":"https://playcanvas.com","realtime":{"http":"https://rt2.playcanvas.com"},"messenger":{"http":"https://msg.playcanvas.com/","ws":"https://msg.playcanvas.com/messages"},"autocomplete":"https://s3-eu-west-1.amazonaws.com/code.playcanvas.com/tern-playcanvas.json"}};
        document.title = config.title;
    </script>

   <div id="editor" class="code-editor">
        <div class="code-editor-topbar">
            <span class="code-editor-logo hidden-xs">
                PLAY<span class="thin">CANVAS</span>
            </span>
            <span class="code-editor-logo-small hidden-xs">
                CODE EDITOR
            </span>
            <div id="btn-save" class="code-editor-save">
                 SAVE
            </div>
            <div id="progress" class="code-editor-progress">
                <img src="//s3-eu-west-1.amazonaws.com/static.playcanvas.com/platform/images/loader_transparent.gif" width="24" height="24" />
            </div>
            <span id="readonly" class="code-editor-readonly">
                READ-ONLY
            </span>
            <span id="error" class="code-editor-error">
            </span>
        </div>
        <div id="editor-container" />
        <div id="users" class="hidden-xs"/>
    </div>

    <!-- core -->
    <script src='/editor/scene/js/events.js'></script>
    <script src='/editor/scene/js/realtime/sockjs.0.3.4.min.js'></script>
    <script src='https://msg.playcanvas.com/messenger.js'></script>

    <!-- main -->
    <script src='/editor/scene/js/code-editor.js'></script>

</body>
</html>
