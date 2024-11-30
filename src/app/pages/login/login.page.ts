import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Configuração do formulário de login
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  // Método para login com email e senha
  async loginWithEmailAndPassword() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
        console.log('Usuário autenticado:', userCredential.user);
        alert('Login bem-sucedido!');
        // Redireciona para a página inicial ou dashboard
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Erro ao autenticar:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  // Método para login com Google
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      console.log('Usuário autenticado com Google:', result.user);
      alert('Login com Google bem-sucedido!');
      // Redireciona para a página inicial ou dashboard
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao autenticar com Google:', error);
      alert('Erro ao autenticar com Google. Tente novamente.');
    }
  }
}
