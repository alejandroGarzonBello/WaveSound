package org.wavesoundback.mappers;

import org.mapstruct.Mapper;
import org.wavesoundback.dto.PlaylistDto;
import org.wavesoundback.entities.Playlist;

@Mapper(componentModel="spring")
public interface PlaylistMapper {

    PlaylistDto playlistToDto (Playlist playlist);
    Playlist playlistToEntity (PlaylistDto playlistDto);
}
