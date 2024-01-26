import {form} from "./form.js";
import startGame from "./startGame.js";
import { buttonTable } from "./table/buttonTable.js";

// Função para obter informações do álbum por ID
async function getAlbumInfo(albumId) {
    try {
      // Fazendo uma solicitação para a API do MusicBrainz usando fetch
      const response = await fetch(`https://musicbrainz.org/ws/2/release/${albumId}?inc=recordings&fmt=json`, {
        headers: {
            'User-Agent': "pesquiseSeuArtista/1.0 (henriqueau111@gmail.com)",
            'Authorization': `Bearer j0JXCyjUDafaWGec4WwoLWVoxcxplOV5`,
        }
      });
  
      // Verificando se a solicitação foi bem-sucedida (código de status 200)
      if (response.ok) {
        const album = await response.json();
  
        // Extraindo informações relevantes
        const albumTitle = album.title;
        const artistName = album['artist-credit'][0].artist.name;
        const tracks = album.media[0].tracks;
  
        console.log(`Álbum: ${albumTitle}`);
        console.log(`Artista: ${artistName}`);
        console.log('Faixas:');
  
        tracks.forEach((track, index) => {
          console.log(`${index + 1}. ${track.title}`);
        });
      } else {
        console.error(`Erro ao obter informações do álbum. Código de status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao fazer solicitação para a API do MusicBrainz:', error.message);
    }
  }
  
  // Usando o ID do álbum "Abbey Road" dos Beatles
  const albumId = 'e6da0731-c7b9-4f07-b10c-2d37b446d170';
  getAlbumInfo(albumId);

startGame()
form()
buttonTable()
