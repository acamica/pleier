import {Directive, bindToCtrlCallOnInit} from '../ng-helper/facade';
import {YoutubePlayer} from '../players/youtube/youtube-player.model';
import {RxPlayerComponent} from '../players/rx-player.component';

@Directive({
    selector: 'playerSetQuality',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class PlayerSetQualityDirective {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element', '$parse', '$attrs', '$scope'];
    constructor (private elm, private $parse, private attrs, private scope) {
    }

    ngOnInit () {
        const fn = this.$parse(this.attrs.playerSetQuality);

        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) =>
                this.elm.on('click', () =>
                        this.scope.$apply(() =>
                            player.setHumanPlaybackQuality(fn(this.scope))
                        )
                )
            );
    }
}