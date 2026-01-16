const fs = require('fs');
const path = require('path');

// File where tasks will be saved
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Class to manage tasks
class TodoList {
    constructor() {
        this.tasks = this.loadTasks();
    }

    // Load tasks from file
    loadTasks() {
        try {
            if (fs.existsSync(TASKS_FILE)) {
                const data = fs.readFileSync(TASKS_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.log('⚠️  Error loading tasks, starting new list');
        }
        return [];
    }

    // Save tasks to file
    saveTasks() {
        try {
            fs.writeFileSync(TASKS_FILE, JSON.stringify(this.tasks, null, 2));
            return true;
        } catch (error) {
            console.log('❌ Error saving tasks');
            return false;
        }
    }

    // Add new task
    add(description) {
        if (!description || description.trim() === '') {
            console.log('❌ Task cannot be empty');
            return;
        }

        const newTask = {
            id: this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        console.log(`✅ Task added: "${newTask.description}" (ID: ${newTask.id})`);
    }

    // List all tasks
    list() {
        if (this.tasks.length === 0) {
            console.log('📝 No tasks in the list');
            return;
        }

        console.log('\n📋 TASK LIST:\n');
        console.log('━'.repeat(60));
        
        this.tasks.forEach(task => {
            const status = task.completed ? '✓' : '○';
            const style = task.completed ? '\x1b[90m' : '\x1b[0m'; // Gray if completed
            const reset = '\x1b[0m';
            
            console.log(`${style}[${status}] ${task.id}. ${task.description}${reset}`);
        });
        
        console.log('━'.repeat(60));
        
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = this.tasks.length - completed;
        console.log(`\n📊 Total: ${this.tasks.length} | Pending: ${pending} | Completed: ${completed}\n`);
    }

    // Complete a task
    complete(id) {
        const task = this.tasks.find(t => t.id === parseInt(id));
        
        if (!task) {
            console.log(`❌ Task not found with ID: ${id}`);
            return;
        }

        if (task.completed) {
            console.log(`⚠️  Task was already completed: "${task.description}"`);
            return;
        }

        task.completed = true;
        task.completedAt = new Date().toISOString();
        this.saveTasks();
        console.log(`✓ Task completed: "${task.description}"`);
    }

    // Delete a task
    delete(id) {
        const index = this.tasks.findIndex(t => t.id === parseInt(id));
        
        if (index === -1) {
            console.log(`❌ Task not found with ID: ${id}`);
            return;
        }

        const deleted = this.tasks.splice(index, 1)[0];
        this.saveTasks();
        console.log(`🗑️  Task deleted: "${deleted.description}"`);
    }

    // Clear completed tasks
    clear() {
        const beforeCount = this.tasks.length;
        this.tasks = this.tasks.filter(t => !t.completed);
        const removed = beforeCount - this.tasks.length;
        
        if (removed === 0) {
            console.log('ℹ️  No completed tasks to remove');
            return;
        }

        this.saveTasks();
        console.log(`🗑️  ${removed} completed task(s) deleted`);
    }
}

// Function to show help
function showHelp() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║              📝 TODO LIST SYSTEM (TASK LIST)              ║
╚═══════════════════════════════════════════════════════════╝

USAGE:
  node function.js <command> [arguments]

COMMANDS:

  add <description>     Add a new task
                        Example: node function.js add "Study JavaScript"

  list                  Show all tasks
                        Example: node function.js list

  complete <id>         Mark a task as completed
                        Example: node function.js complete 1

  delete <id>           Delete a specific task
                        Example: node function.js delete 2

  clear                 Delete all completed tasks
                        Example: node function.js clear

  help                  Show this help
                        Example: node function.js help

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

USAGE EXAMPLES:

  node function.js add "Finish ITM project"
  node function.js list
  node function.js complete 1
  node function.js delete 2
  node function.js clear

`);
}

// Main program
function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const todo = new TodoList();

    if (!command || command === 'help') {
        showHelp();
        return;
    }

    switch (command.toLowerCase()) {
        case 'add':
            const description = args.slice(1).join(' ');
            todo.add(description);
            break;

        case 'list':
            todo.list();
            break;

        case 'complete':
        case 'done':
            if (!args[1]) {
                console.log('❌ You must provide the task ID');
                console.log('   Example: node function.js complete 1');
            } else {
                todo.complete(args[1]);
            }
            break;

        case 'delete':
        case 'remove':
            if (!args[1]) {
                console.log('❌ You must provide the task ID');
                console.log('   Example: node function.js delete 1');
            } else {
                todo.delete(args[1]);
            }
            break;

        case 'clear':
            todo.clear();
            break;

        default:
            console.log(`❌ Unknown command: "${command}"`);
            console.log('💡 Use "node function.js help" to see available commands');
    }
}

// Run the program
main();
