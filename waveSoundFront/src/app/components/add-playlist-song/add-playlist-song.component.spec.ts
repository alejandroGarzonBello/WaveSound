import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaylistSongComponent } from './add-playlist-song.component';

describe('AddPlaylistSongComponent', () => {
  let component: AddPlaylistSongComponent;
  let fixture: ComponentFixture<AddPlaylistSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPlaylistSongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPlaylistSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
