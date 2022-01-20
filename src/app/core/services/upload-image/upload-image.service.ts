import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: Storage) { }

  private createFileName(f: File){
    //pop remove o ultimo elemento, contudo o retorna, então é um otimo uso para pegar a extensão
    const ext = f.name.split('.').pop();
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return `${name}.${ext}`;
  }

  upload(image: File, folder: string = 'users/'){
    const filename = this.createFileName(image);
    const profile = ref(this.storage, folder + filename);

    return from(uploadBytes(profile, image)).pipe(
      // switchMap usado para iniciar um novo Observable
      switchMap((_)=>{
        // return from para também retornar um Observable
        return from(getDownloadURL(profile));
      })
    )
  }
}
