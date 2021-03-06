import {Component} from '../../ng-helper/facade';
import {Observable, observeScopeDestroy} from '../../util/rx/facade';
import {IVideoPlayer} from '../../players/facade';
import {IMarkerLike} from '../../markers/facade';

@Component({
    selector: 'progressBarMarker',
    scope: {
        player: '<',
        marker: '<',
        barCssClass: '<?'
    }
})
export class ProgressBarMarker {
    private player: Observable<IVideoPlayer>;
    private marker: IMarkerLike;
    private barCssClass: string;

    static $inject = ['$element', '$scope'];
    constructor (private elm: ng.IAugmentedJQuery, private scope: ng.IScope) {
    }

    $onInit () {
        const scopeDestroy$ = observeScopeDestroy(this.scope);
        this.player
            .takeUntil(scopeDestroy$)
            .subscribe(player => {
                const duration = player.getDuration();

                if (this.barCssClass) {
                    this.elm.addClass(this.barCssClass);
                }

                const setRelativeTime = () => {
                    const relativeTime = 100 * this.marker.startTime / duration;
                    this.elm.css('left', relativeTime + '%');
                };

                setRelativeTime();

                // if (this.marker.hasOwnProperty('mutable') && this.marker.mutable) {
                //     this.scope.$watch(
                //         function () {
                //             return this.marker.startTime;
                //         },
                //         function (newTime, oldTime) {
                //             if (newTime === oldTime) {
                //                 return;
                //             }
                //             setRelativeTime();
                //         }
                //     );
                // }
            });
    }
}
