//DergoMesazh
function onSuccess(data, status)
        {
            data = $.trim(data);
            $("#notification").text(data);
        }
  
        function onError(data, status)
        {
            // handle an error
        }        
  
        $(document).ready(function() {
            $("#submit").click(function(){
  
                var formData = $("#callAjaxForm").serialize();
  
                $.ajax({
                    type: "POST",
                    url: "http://radio-pendimi.com/mobile/v2/send.php",
                    crossDomain:true,
                    cache: false,
                    data: formData,
                    success: onSuccess,
                    error: onError
                });
				return false;
            });
			$("#reset").click(function() {
				$('#callAjaxForm').trigger("reset");
				$('#notification').text("");
			});
        });

//Pushwoosh
function init() {
    document.addEventListener("deviceready", initPushwoosh, true);
 
    //rest of the code
}

function initPushwoosh()
{
    var pushNotification = window.plugins.pushNotification;
 
    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
                //get the notification payload
                var notification = event.notification;
 
                //display alert to the user for example
                alert(JSON.stringify(notification));
    });
 
    //initialize the plugin
    pushNotification.onDeviceReady({ appid: "BFF01-95906", serviceName: "" });
 
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}
		
		
//URL handlers
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    // Mock device.platform property if not available
    if (!window.device) {
        window.device = { platform: 'Browser' };
    }

    handleExternalURLs();
}

function handleExternalURLs() {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'ANDROID') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
    }
    else if (device.platform.toUpperCase() === 'IOS') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            window.open(url, '_system');
            e.preventDefault();
        });
    }
    else {
        // Leave standard behaviour
    }
}