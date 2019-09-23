import { Injectable } from '@angular/core';
import { Admin } from './admin.model'; // optional

import { Router } from '@angular/router';


import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseCollectionName } from 'src/app/constants/collection.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  admin$: Observable<Admin>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router
      
  ) {
    // Get the auth state, then fetch the Firestore admin document or return null
    this.admin$ = this.afAuth.authState.pipe(
      switchMap(admin => {
          // Logged in
        if (admin) {
          return this.afs.doc<Admin>(FirebaseCollectionName.COLLECTION_ADMINS +`/`+`${admin.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )

   }



   async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    //credential.user used 
    console.log("inside googleSignIn----->",credential.user.uid);
    //this.router.navigate(['dashboard']);
    
    return this.updateAdminData(credential.user);
    // this.updateAdminData(credential.user);
    // this.router.navigate(['Dashboard']);
    // return credential.user;
  }

  private updateAdminData(admin) {
    // Sets admin data to firestore on login
    const adminRef: AngularFirestoreDocument<Admin> = this.afs.doc(FirebaseCollectionName.COLLECTION_ADMINS +`/${admin.uid}`);

    const data = { 
      uid: admin.uid, 
      email: admin.email, 
      displayName: admin.displayName, 
      photoURL: admin.photoURL
    } 
    
   adminRef.set(data, { merge: true });
   //console.log('Inside updateAdminData',adminRef.get);
   return;

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }


}




