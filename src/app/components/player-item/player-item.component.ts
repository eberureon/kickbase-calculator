import { Component, EventEmitter, Input, type OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { KickbaseGroup } from '../../model/kickbase-group';
import type { KickbasePlayer } from '../../model/kickbase-player';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [CommonModule, FormsModule, AngularSvgIconModule],
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.scss']
})
export class PlayerItemComponent implements OnInit {

  @Input() player: KickbasePlayer;
  @Input() withoutApi: boolean;
  @Input() printMode: boolean;
  @Input() isMarketOverview: boolean;



  @Output() removePlayer = new EventEmitter();
  @Output() loadDetails = new EventEmitter();

  @Output() playerChanged = new EventEmitter();
  @Output() savePlayer = new EventEmitter();
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
  }

  onLoadAllDetailsForPlayer = async () => {
    this.loadDetails.emit();
  }

  onRemovePlayer() {
    this.removePlayer.emit();
  }

  errorHandler(event) {
    console.debug(event);
    event.target.src = "https://cdn.browshot.com/static/images/not-found.png";
  }

  onEditPlayerValue(player: KickbasePlayer, event: MouseEvent) {
    player.isInEditMode = true;
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onEditPlayerValueDone(player: KickbasePlayer, event: MouseEvent = null) {
    if (event !== null && event !== undefined) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
    player.isInEditMode = false;
    this.savePlayer.emit();
    // this.saveLocalPlayers();
  }

  onPlayerValueChanged(event) {
    this.playerChanged.emit();
  }

  onSetPlayerPermanentDeleted(event: MouseEvent, player: KickbasePlayer, deleted: boolean) {
    event.stopImmediatePropagation();
    event.preventDefault();
    player.isPersitantDeleted = deleted;
    this.apiService.setPlayerPermanentDeleted(player.leagueId, player.id, deleted);
    this.playerChanged.emit()
  }

}
