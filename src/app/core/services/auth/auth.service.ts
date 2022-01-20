import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { user } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { from, map, of, switchMap, tap } from 'rxjs';

import { User } from './../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Auth responsável pela autentição do firebase
  //Firestore responsável por salvar o usuario criado e modelado pelo payload
  constructor(private auth: Auth, private db: Firestore) { }

  login(email: string, password: string){
    //signIn retorna uma promisse, 'from' do rxjs transforma a Promisse em Observable
    //'from' tbm pode transformar outras fontes em Observable
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string, payload: User){
    return from(createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(
      //quando a Promise é concluida ele retorna um UserCredential e nele consta o uid
      tap((creds)=> {
        //atribuindo o uid do UserCredential, só gerando aqui ao Objeto de tipo 'User'
        payload.uid = creds.user.uid;

        //CRIANDO COLEÇÃO (NOSQL) DO FIREBASE
        //nome da coleção 'users', se n existir ele cria
        const users = collection(this.db, 'users');
        //DOCUMENTO - PADRÃO DA ESTRUTURA NOSQL | COLEÇÕES TEM DOCUMENTOS
        //Coleção e a referência do documento como argumentos | Documento com referência do user
        const userDoc = doc(users, payload.uid);
        //Pegando a referência desse documento e salvando
        setDoc(userDoc, payload);
      })
    )
  }

  logout(){
    this.auth.signOut();
  }

  get user(){
    //user do @angular/fire, tipo do firebase, retorna um usuario ou null | Se retonar o user ele tá logado
    return user(this.auth).pipe(
      //switchMap quando quer enviar de um Observable para outro sem colidor/encadear a tipagem
      //Permite tratar o resultado de um Observable (valor emitido) e te obriga a retornar um novo Observable
      switchMap((user) => {
        //se há um User ele continua e chama o metodo privado abaixo passando o uid, se não retorna undefined
        if(user){
          return this.getUserData(user.uid);
        }
        return of(undefined)
      })
    )
  }

  private getUserData(uid: string){
    const users = collection(this.db, 'users');
    const userDoc = doc(users, uid);

    return docData(userDoc).pipe(
      map(
        //converter a data do firebase em tipo Date do JS
        (data) => ({ ...data, birthdate: data['birthdate'].toDate() } as User)
      )
    );
  }

  update(user: User){
    const users = collection(this.db, 'users');
    const userDoc = doc(users, user.uid);
    //from irá retornar observable da operação - manter padrão
    return from (updateDoc(userDoc, user as any));
  }
}
