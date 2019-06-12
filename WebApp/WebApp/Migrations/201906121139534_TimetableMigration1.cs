namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TimetableMigration1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Timetables", "IdTimetableActive", c => c.Int(nullable: false));
            CreateIndex("dbo.Timetables", "IdTimetableActive");
            AddForeignKey("dbo.Timetables", "IdTimetableActive", "dbo.TimetableActives", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Timetables", "IdTimetableActive", "dbo.TimetableActives");
            DropIndex("dbo.Timetables", new[] { "IdTimetableActive" });
            DropColumn("dbo.Timetables", "IdTimetableActive");
        }
    }
}
