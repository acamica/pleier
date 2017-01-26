import * as angular from 'angular';
import {Component} from 'src/ng-helper/component';
import 'src/main';
import 'rxPlayerTpl';

// TODO: Refactor to @Injectable and providers
// http://blog.rangle.io/configurable-services-in-angular-2/
// Create the app module and configure it
angular
    .module('demoControls', ['rxPlayer', 'rxPlayerTpls'])
    .config(['youtubeProvider', configureYoutubeProvider]);

function configureYoutubeProvider(youtubeProvider) {
    // This options are taken from here
    // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
    youtubeProvider.setPlayerVarOption('controls', 0);
    youtubeProvider.setPlayerVarOption('showinfo', false);
    youtubeProvider.setPlayerVarOption('modestbranding', 1);
    youtubeProvider.setPlayerVarOption('disablekb', 1);
}

@Component({
    selector: 'controlsDemo',
    templateUrl: '/demo/controls/controls.component.html'
})
class ControlsDemoComponent {
    videoId = 'QjX9Wu-MJ-s';
}