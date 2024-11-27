import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Configuração do formulário de registro
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para registrar usuário com e-mail e senha
  async submitForm() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log('Usuário registrado:', userCredential.user);
        alert('Registro concluído com sucesso!');
        // Redireciona para a página inicial ou dashboard
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Erro ao registrar:', error);
        alert('Erro ao registrar. Verifique os dados e tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  // Método para autenticação com Google
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

  ngOnInit() {}
}
