import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html'
})
export class Students {

  students = signal<any[]>([]);
  selected = signal<any>({ id: 0, name: '', class: '', section: '' });

  constructor(private service: StudentService) {
    this.load();
  }

  load() {
    this.service.getStudents().subscribe(data => this.students.set(data));
  }

  save() {
    const s = this.selected();
    if (s.id === 0)
      this.service.addStudent(s).subscribe(() => this.load());
    else
      this.service.updateStudent(s).subscribe(() => this.load());

    this.reset();
  }

  edit(s: any) {
    this.selected.set({ ...s });
  }

  delete(id: number) {
    this.service.deleteStudent(id).subscribe(() => this.load());
  }

  reset() {
    this.selected.set({ id: 0, name: '', class: '', section: '' });
  }
}
