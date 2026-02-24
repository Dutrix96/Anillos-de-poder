import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portadores-component',
  imports: [FormsModule],
  templateUrl: './portadores-component.html',
  styleUrl: './portadores-component.css',
})
export class PortadoresComponent implements OnInit{

  nombreAnillo =''
  nombrePortador= ''
  raza= ''
  corrupcion=0

  ngOnInit(): void {
    this.nombreAnillo=localStorage.getItem("nombreAnillo") ?? ""
    this.nombrePortador=localStorage.getItem("nombrePortador") ?? ""
    this.raza=localStorage.getItem("raza") ?? ""
    this.corrupcion=Number(localStorage.getItem("nombreAnillo")) ?? 0
    }

  guardarDatos(){
    localStorage.setItem("nombreAnillo", this.nombreAnillo)
    localStorage.setItem("nombrePortador", this.nombrePortador)
    localStorage.setItem("raza", this.raza)
    localStorage.setItem("corrupcion", JSON.stringify(this.corrupcion))
  }
}
