// admin-usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Service/usuario.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuario = { username: '', password: '', role: 'ROLE_WORKER' };
  editando = false;
  usuarioId: number | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Obtener la lista de usuarios
  obtenerUsuarios() {
    this.usuarioService.getUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }

  // Crear o actualizar usuario
  onSubmit() {
    if (this.editando && this.usuarioId) {
      // Actualizar usuario
      this.usuarioService.updateUser(this.usuarioId, this.usuario).subscribe(() => {
        this.obtenerUsuarios();
        this.resetFormulario();
      });
    } else {
      // Crear nuevo usuario
      this.usuarioService.createUser(this.usuario).subscribe(() => {
        this.obtenerUsuarios();
        this.resetFormulario();
      });
    }
  }

  // Editar usuario
  editarUsuario(user: any) {
    this.usuario = { ...user };
    this.usuarioId = user.id;
    this.editando = true;
  }

  // Eliminar usuario
  eliminarUsuario(id: number) {
    this.usuarioService.deleteUser(id).subscribe(() => {
      this.obtenerUsuarios();
    });
  }

  // Resetear formulario
  resetFormulario() {
    this.usuario = { username: '', password: '', role: 'ROLE_WORKER' };
    this.editando = false;
    this.usuarioId = null;
  }
}
